import BullMQ from "bullmq";
import { eventHandler, readBody, setHeader } from "h3";
import { nanoid } from "nanoid";
import { redis } from "../../../services/dbConnectors/redisConnector";

const { Queue } = BullMQ;


const queue = new Queue("devdocsflow-queue", {
  connection: redis.duplicate()
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  // Generate a unique jobId BEFORE subscribing

  const projectAndJobId = nanoid();
  const jobId = projectAndJobId;
  const channel = `llm-stream-${jobId}`;

  // Create and subscribe to Redis channel BEFORE queueing the job
  const subscriber = redis.duplicate();
  await subscriber.subscribe(channel);

  // Set up SSE headers immediately
  setHeader(event, "Content-Type", "text/event-stream; charset=utf-8");
  setHeader(event, "Cache-Control", "no-cache, no-transform");
  setHeader(event, "Connection", "keep-alive");

  async function send(data){
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send initial queued status
  send({ jobId, status: "queued" });

  async function cleanup() {
    subscriber.removeAllListeners();
    await subscriber.unsubscribe(channel).catch(() => {});
    await subscriber.quit().catch(() => {});
  };

  // Set up message listener
  subscriber.on("message", async (chan, message) => {
    if (chan !== channel) return;
    const payload = JSON.parse(message);
    send(payload);
    if (payload.done) {
      await cleanup();
      event.node.res.end();
    }
  });

  event.node.req.on("close", cleanup);

  const projectDescription = "I want you to create me an simple CRM"
  const projectPreferences = "I have no preferences."
  const userId = "test-user-123"

  // Prepare payload
  const payload = {
    projectDescription,
    projectId: projectAndJobId,
    userId,
    projectPreferences
  }

  // NOW add the job to the queue with the custom jobId
  // This ensures we're already subscribed before the worker starts processing
  await queue.add("initialProjectCreationJob", payload, {
    jobId: jobId,  // Use custom jobId so worker publishes to the right channel
    removeOnComplete: true,
    attempts: 3
  });

  // Keep the HTTP connection open until cleanup runs
  return new Promise(() => {});
});

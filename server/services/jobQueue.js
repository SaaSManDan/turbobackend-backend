/**
 * Job Queue Service
 * Manages BullMQ job queues for long-running operations
 */

import { Queue } from 'bullmq';
import { redis } from './dbConnectors/redisConnector.js';

let queues = {};

export function initializeQueues() {
  // Create connection object for BullMQ
  const connection = {
    host: redis.options.host,
    port: redis.options.port,
    ...(redis.options.username && { username: redis.options.username }),
    ...(redis.options.password && { password: redis.options.password }),
    ...(redis.options.tls && { tls: redis.options.tls })
  };
  
  // Create "turbobackend-queue" queue
  queues['turbobackend-queue'] = new Queue('turbobackend-queue', {
    connection
  });
  
  console.log('Job queues initialized');
  
  return queues;
}

export async function addJob(queueName, jobData, sseStreamId) {
  // Initialize queues if not already done
  if (Object.keys(queues).length === 0) {
    initializeQueues();
  }
  
  const queue = queues[queueName];
  
  if (!queue) {
    throw new Error(`Queue not found: ${queueName}`);
  }
  
  // Add job to queue with streamId
  const job = await queue.add(queueName, {
    ...jobData,
    streamId: sseStreamId
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
  
  return job;
}

export function getQueue(queueName) {
  if (Object.keys(queues).length === 0) {
    initializeQueues();
  }
  
  return queues[queueName];
}

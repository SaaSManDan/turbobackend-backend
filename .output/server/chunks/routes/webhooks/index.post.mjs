import { e as eventHandler, g as getRequestHeaders, a as errorLogger, s as setResponseStatus, r as readRawBody, b as sendEmail } from '../../nitro/nitro.mjs';
import { Pool } from 'pg';
import Stripe from 'stripe';
import { Webhook } from 'svix';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'dotenv';
import '@logsnag/node';
import 'nodemailer';
import 'nanoid';
import 'node:url';
import '@clerk/backend';

const requiredEnvVars = [
  "PG_DB_HOST",
  "PG_DB_PORT",
  "PG_DB_USER",
  "PG_DB_PASS",
  "PG_DB_NAME"
];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing Postgres environment variables: ${missingEnvVars.join(", ")}`
  );
}
const pool = new Pool({
  host: process.env.PG_DB_HOST,
  port: Number(process.env.PG_DB_PORT),
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASS,
  database: process.env.PG_DB_NAME,
  ssl: { rejectUnauthorized: false }
});
async function testPostgresConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public';"
    );
    client.release();
    console.log("PostgresDB connection successful.");
    result.rows.forEach((row) => {
      console.log(`- ${row.tablename}`);
    });
    return true;
  } catch (error) {
    console.error("Postgres connection failed:", error);
    return false;
  }
}
testPostgresConnection();

const stripeSecret = process.env.STRIPE_STANDARD_SECRET_KEY;
if (!stripeSecret) {
  throw new Error("Missing STRIPE_STANDARD_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeSecret);
const index_post = eventHandler(async (event) => {
  const req = event.node.req;
  const headers = getRequestHeaders(event);
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    errorLogger(req.url, "Webhook secret key error", "stripe-webhook");
    throw new Error("Webhook secret key error");
  }
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];
  if (!svix_id || !svix_timestamp || !svix_signature) {
    errorLogger(req.url, "Error occured -- no svix headers");
    setResponseStatus(event, 400);
    return { message: "Error occured -- no svix headers" };
  }
  const payload = await readRawBody(event);
  if (!payload) {
    errorLogger(req.url, "Error occured -- empty payload");
    setResponseStatus(event, 400);
    return { message: "Error occured -- empty payload" };
  }
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });
  } catch (err) {
    errorLogger(req.nextUrl, err, "signup-webhook");
    setResponseStatus(event, 400);
    return { message: "Error occured" };
  }
  const eventType = evt.type;
  if (eventType === "user.created") {
    console.log("User created event received" + JSON.stringify(evt, null, 2));
    const userId = evt.data.id;
    const userEmail = evt.data.email_addresses[0].email_address;
    try {
      const customer = await stripe.customers.create({
        email: userEmail
      });
      const customerId = customer.id;
      console.log("Customer created in Stripe: " + JSON.stringify(customer, null, 2));
      const joinedAt = Math.floor(Date.now() / 1e3);
      await pool.query(
        "INSERT INTO " + process.env.PG_DB_SCHEMA + ".users(user_id, email, joined_at, payment_status, stripe_customer_id) VALUES ($1, $2, $3, $4, $5)",
        [userId, userEmail, joinedAt, "trial", customerId]
      );
      await sendEmail("drodriguez.dcr@gmail.com", "New User Signed Up", "A new user has signed up!");
      setResponseStatus(event, 200);
      return { message: "Success" };
    } catch (error) {
      errorLogger(req.url, error, "signup-webhook");
      console.error(error);
      setResponseStatus(event, 500);
      return { message: "Internal Server Error" };
    }
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

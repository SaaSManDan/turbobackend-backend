import { e as eventHandler } from '../../nitro/nitro.mjs';
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

const index_get = eventHandler((event) => {
  const { userId } = event.context.auth;
  return { message: "You are logged in, your user id is: " + userId };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map

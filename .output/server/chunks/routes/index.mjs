import { e as eventHandler } from '../nitro/nitro.mjs';
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

const index = eventHandler(() => {
  console.log("This endpoint has been hit.");
  return { message: "Hello from Nitro!" };
});

export { index as default };
//# sourceMappingURL=index.mjs.map

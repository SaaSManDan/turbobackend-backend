import { defineNitroPlugin } from 'nitropack/runtime';
import { config as loadEnv } from 'dotenv';
import { existsSync } from 'node:fs';

const dotenvFiles = ['.env', '.env.local'];
let hasLoadedEnv = false;

export default defineNitroPlugin(() => {
    if (hasLoadedEnv) {
        return;
    }

    for (const file of dotenvFiles) {
        if (!existsSync(file)) {
            continue;
        }
        loadEnv({ path: file, override: true });
    }

    hasLoadedEnv = true;
});

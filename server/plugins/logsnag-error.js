import { defineNitroPlugin } from 'nitropack/runtime';
import { errorLogger } from '../utils/errorLogger';

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('error', async (error, { event }) => {
        const path = event?.path ?? 'unknown route';
        const userId = event?.context?.userId ?? "no-user-id";
        await errorLogger(path, error, userId);
    });
});

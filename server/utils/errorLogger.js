import { LogSnag } from "@logsnag/node";
import { sendEmail } from '../services/emailSender';
import { nanoid } from "nanoid";

let cachedLogsnag;
let attemptedInit = false;

function getLogsnagClient() {
    if (cachedLogsnag || attemptedInit) {
        return cachedLogsnag;
    }

    attemptedInit = true;

    const token = process.env.LOGSNAG_API_TOKEN;
    const project = process.env.LOGSNAG_PROJECT || "dev-docs";

    if (!token) {
        console.warn("LogSnag token is missing; skipping LogSnag tracking.");
        return null;
    }

    cachedLogsnag = new LogSnag({
        token,
        project,
    });

    return cachedLogsnag;
}

export async function errorLogger(errorLocation, errorDetails, userId){
    const errorId = nanoid();
    const logsnagClient = getLogsnagClient();

    if (logsnagClient) {
        try{
            await logsnagClient.track({
                channel: "backend-errors",
                event: "API Error",
                description: "There was an error at:\n" + errorLocation + ": \n" + (errorDetails?.stack || errorDetails),
                icon: ":warning:",
                user_id: userId,
                tags: {
                    errorId: errorId
                }
            });
        } catch(err){
            console.error("LogSnag logging error:", err?.response?.data || err);
        }
    }

    if(errorLocation != "emailSender"){ // to prevent infinite loop
        await sendEmail(
            "drodriguez.dcr@gmail.com",
            "API Error",
            "There was an error at " + errorLocation + ": \n" + (errorDetails?.stack || errorDetails) + "\nerror-id:" + errorId
        );
    }
   //}

   //maybe return the error id
}

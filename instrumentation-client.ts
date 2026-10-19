import { initBotId } from "botid/client/core";

// Attaches BotID's challenge to the contact form's Server Action, which POSTs to the home page.
initBotId({ protect: [{ path: "/", method: "POST" }] });

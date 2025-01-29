import { getUser } from "../utils/get-user";

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("request", async (event) => {
        event.context.$authorization = {
            resolveServerUser: () => getUser(event),
        };
    });
});

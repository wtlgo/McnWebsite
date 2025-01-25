import { Config } from "@vkid/sdk";

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;
    Config.set({
        app: 52849133,
        redirectUrl: `${location.protocol}//${location.host}/vk-auth`,
    });
});

import { Config } from "@vkid/sdk";

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;
    Config.set({
        app: 52849133,
        redirectUrl: import.meta.dev
            ? "http://localhost/vk-auth"
            : "https://mikchan.net/vk-auth",
    });
});

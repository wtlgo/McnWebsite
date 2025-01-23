import fs from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    devServer: {
        port: 80,
        /*
        port: 443,
        https: {
            key: fs.readFileSync("./localhost.key").toString(),
            cert: fs.readFileSync("./localhost.crt").toString(),
        },
        */
    },

    runtimeConfig: {
        vkApiServiceKey: process.env["VK_API_SERVICE_KEY"],
        mysqlConnectionString: process.env["DATABASE_URL"],
        mineskinKey: process.env["MINESKIN_KEY"],
        imgurClientSecret: process.env["IMGUR_CLIENT_SECRET"],

        public: {
            imgurClientId: process.env["IMGUR_CLIENT_ID"],
        },
    },

    modules: [
        "vuetify-nuxt-module",
        "@hebilicious/vue-query-nuxt",
        "@vueuse/nuxt",
    ],
    vuetify: {
        vuetifyOptions: {
            theme: {
                defaultTheme: "dark",
            },
            icons: {
                defaultSet: "mdi-svg",
            },
        },
    },
});

import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            type: "page",
            source: "article/**/*.md",
        }),
    },
});

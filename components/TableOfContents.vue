<template>
    <v-expansion-panels variant="popout">
        <v-expansion-panel title="Оглавление" color="primary">
            <template #text>
                <table-of-contents-list class="v-card-text" :items="headers" />
            </template>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>
import { z } from "zod";

const article = injectArticle();

const headerTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const headersSchema = z.tuple([
    z.enum(headerTags),
    z.object({ id: z.string() }),
    z.string(),
]);

const headers = computed(() => {
    const artVal = article.value;
    if (!artVal) return [];
    if (!("body" in artVal && artVal["body"] instanceof Object)) return [];
    const body = artVal.body;

    if (!("value" in body && body["value"] instanceof Array)) return [];
    const value = body.value;

    const headers = value
        .map((it) => {
            const item = headersSchema.safeParse(it);
            if (!item.success) return null;
            return {
                lvl: +item.data[0].slice(1),
                id: item.data[1].id,
                title: item.data[2],
            };
        })
        .filter((it) => !!it);

    const result: TOCItem[] = [];
    const stack: { lvl: number; item: TOCItem }[] = [];

    for (const node of headers) {
        const item: TOCItem = { ...node, children: [] };

        while (stack.length && stack[stack.length - 1].lvl >= node.lvl) {
            stack.pop();
        }

        if (stack.length) {
            stack[stack.length - 1].item.children.push(item);
        } else {
            result.push(item);
        }

        stack.push({ ...node, item });
    }

    return result;
});
</script>

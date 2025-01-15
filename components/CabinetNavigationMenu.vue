<template>
    <v-list nav>
        <v-list-item
            v-for="(item, idx) in items"
            :key="idx"
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.route"
            :href="item.href"
        />

        <v-divider />

        <v-list-item
            v-for="(item, idx) in additionalItems"
            :key="idx"
            :prepend-icon="item.icon"
            :to="item.route"
            :href="item.href"
        >
            <template #title>
                {{ item.title }} <v-icon :icon="mdiLink" size="x-small" />
            </template>
        </v-list-item>
    </v-list>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";
import { mdiListBox, mdiAccount, mdiMap, mdiVote, mdiLink } from "@mdi/js";
import { siVk } from "simple-icons";

interface ItemT {
    title: string;
    route?: RouteLocationRaw;
    href?: string;
    icon?: string;
}

const items: ItemT[] = [
    {
        title: "Мои профили",
        route: "/cabinet/profiles",
        icon: mdiAccount,
    },
    {
        title: "Список игроков",
        route: "/cabinet/player-list",
        icon: mdiListBox,
    },
];

const additionalItems: ItemT[] = [
    {
        title: "Группа ВК",
        href: "https://vk.com/mikchanno",
        icon: siVk.path,
    },
    {
        title: "Карта креатив-сервера",
        href: "https://map.creative.mikchan.net",
        icon: mdiMap,
    },
    {
        title: "Голосование за моды",
        href: "https://mod-vote.mikchan.net/",
        icon: mdiVote,
    },
];
</script>

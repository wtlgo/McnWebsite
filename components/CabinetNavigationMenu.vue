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
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.route"
            :href="item.href"
        />
    </v-list>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";
import {
    mdiViewDashboard,
    mdiNaturePeople,
    mdiFaceManProfile,
    mdiMap,
    mdiVote,
    mdiGroup,
} from "@mdi/js";

interface ItemT {
    title: string;
    route?: RouteLocationRaw;
    href?: string;
    icon: string;
}

const items: ItemT[] = [
    { title: "Дешборд", route: "/cabinet/dashboard", icon: mdiViewDashboard },
    {
        title: "Мои профили",
        route: "/cabinet/profiles",
        icon: mdiFaceManProfile,
    },
    {
        title: "Список игроков",
        route: "/cabinet/player-list",
        icon: mdiNaturePeople,
    },
];

const additionalItems: ItemT[] = [
    { title: "Группа ВК", href: "https://vk.com/mikchanno", icon: mdiGroup },
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

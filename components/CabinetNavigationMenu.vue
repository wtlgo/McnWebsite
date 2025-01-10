<template>
    <v-list nav>
        <v-list-item
            v-for="(item, idx) in items"
            :key="idx"
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.route"
        />
    </v-list>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";
import { mdiViewDashboard, mdiNaturePeople, mdiFaceManProfile } from "@mdi/js";

const items: { title: string; route: RouteLocationRaw; icon: string }[] = [
    { title: "Дешборд", route: "/cabinet/dashboard", icon: mdiViewDashboard },
    {
        title: "Список игроков",
        route: "/cabinet/player-list",
        icon: mdiNaturePeople,
    },
    {
        title: "Мои профили",
        route: "/cabinet/profiles",
        icon: mdiFaceManProfile,
    },
];
</script>

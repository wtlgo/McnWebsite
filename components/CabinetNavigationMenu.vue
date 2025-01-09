<template>
    <v-list nav>
        <v-list-item
            v-for="(item, idx) in items"
            :key="idx"
            :title="item.title"
            :active="item.route == page"
            :prepend-icon="item.icon"
            @click="page = item.route"
        />
    </v-list>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";
import { mdiViewDashboard, mdiNaturePeople } from "@mdi/js";

const route = useRoute();
const router = useRouter();
const page = computed({
    get: () => route.path as RouteLocationRaw,
    set(val: RouteLocationRaw) {
        router.push(val);
    },
});

const items: { title: string; route: RouteLocationRaw; icon: string }[] = [
    { title: "Дешборд", route: "/cabinet", icon: mdiViewDashboard },
    {
        title: "Список игроков",
        route: "/cabinet/player-list",
        icon: mdiNaturePeople,
    },
];
</script>

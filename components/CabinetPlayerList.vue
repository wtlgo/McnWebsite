<template>
    <one-row>
        <v-text-field label="Поиск" v-model="search" />
    </one-row>

    <v-row>
        <cabinet-player-list-item
            v-for="item in filteredData"
            :key="item.id"
            :item="item"
        />
    </v-row>
</template>

<script lang="ts" setup>
import type { PlayerListData } from "~/shared/types/player-list-data";

const search = ref("");
const { data } = defineProps<{ data: PlayerListData[] }>();
const filteredData = computed(() =>
    data
        .map((d, id) => ({ ...d, id }))
        .filter(
            (d) =>
                d.name.includes(search.value.trim()) ||
                d.vk.toString().startsWith(search.value.trim())
        )
);
</script>

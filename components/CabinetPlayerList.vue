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
const searchDebounced = refDebounced(search, 500);
const { data } = defineProps<{ data: PlayerListData[] }>();
const filteredData = computed(() =>
    data
        .map((d, id) => ({ ...d, id }))
        .filter(
            (d) =>
                d.name
                    .toLowerCase()
                    .includes(searchDebounced.value.trim().toLowerCase()) ||
                d.vk.toString().startsWith(searchDebounced.value.trim())
        )
);
</script>

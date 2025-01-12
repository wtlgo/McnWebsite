<template>
    <one-row>
        <v-text-field label="Поиск" v-model="search" />
    </one-row>

    <one-row> Найдено: {{ filteredData.length }} </one-row>

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
const { cache } = useCacheVkUsers();

const searchedIds = computed(() =>
    cache.value
        .filter((u) =>
            `${u.first_name} ${u.last_name}`
                .toLowerCase()
                .includes(searchDebounced.value.toLowerCase())
        )
        .map((u) => u.id)
);

const filteredData = computed(() =>
    data
        .map((d, id) => ({ ...d, id }))
        .filter(
            (d) =>
                d.vk.toString().startsWith(searchDebounced.value.trim()) ||
                searchedIds.value.includes(d.vk) ||
                d.name
                    .toLowerCase()
                    .includes(searchDebounced.value.trim().toLowerCase())
        )
);
</script>

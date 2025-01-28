<template>
    <one-row>
        <search-bar v-model="search" />
    </one-row>

    <one-row> Найдено: {{ filteredData.length }} </one-row>

    <v-row>
        <lazy-cabinet-player-list-item
            v-for="item in displayValues"
            :key="item.id"
            :item="item"
        />

        <v-col cols="auto">
            <v-progress-circular
                v-if="canLoadMore"
                color="primary"
                indeterminate
                ref="list"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { PlayerListData } from "~/shared/types/player-list-data";

const { data } = defineProps<{ data: PlayerListData[] }>();

const search = ref("");
const searchedIds = useSearchVkIds(search);
const filteredData = useDisjunctiveFilter(
    () => data.map((d, id) => ({ ...d, id })),
    () => [
        ({ vk }) => vk.toString().startsWith(search.value),
        ({ vk }) => searchedIds.value.includes(vk),
        ({ name }) => name.toLowerCase().includes(search.value),
    ]
);

const list = ref<HTMLElement | null>(null);
const { displayValues, canLoadMore } = useLoadingAnchor(list, filteredData);
</script>

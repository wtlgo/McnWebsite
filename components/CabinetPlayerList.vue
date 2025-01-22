<template>
    <one-row>
        <v-text-field label="Поиск" v-model="search" />
    </one-row>

    <one-row> Найдено: {{ filteredData.length }} </one-row>

    <v-row>
        <lazy-cabinet-player-list-item
            v-for="item in elementsToDisplay"
            :key="item.id"
            :item="item"
        />
    </v-row>

    <mid-row ref="list">
        <v-progress-circular v-if="canLoadMore" color="primary" indeterminate />
    </mid-row>
</template>

<script lang="ts" setup>
import type { PlayerListData } from "~/shared/types/player-list-data";
import { useRouteQuery } from "@vueuse/router";

const search = useRouteQuery("q", "");
const searchDebounced = refDebounced(search, 500);

const { data } = defineProps<{ data: PlayerListData[] }>();
const { cache } = useCacheVkUsers();

const searchedIds = computed(() =>
    cache.value
        .filter((u) =>
            `${u.first_name} ${u.last_name}`
                .toLowerCase()
                .includes(searchDebounced.value.trim().toLowerCase())
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

const ELEMENTS_STEP = 12;
const elementsVisible = ref(ELEMENTS_STEP);
const elementsToDisplay = computed(() =>
    filteredData.value.slice(0, elementsVisible.value)
);
const canLoadMore = computed(
    () => elementsVisible.value < filteredData.value.length
);

const list = ref<HtmlElement | null>(null);
const { reset } = useInfiniteScroll(
    list,
    () => {
        elementsVisible.value += ELEMENTS_STEP;
        console.log(elementsVisible.value);
    },
    {
        distance: 10,
        canLoadMore: () => canLoadMore.value,
    }
);

watch(searchedIds, () => {
    elementsVisible.value = ELEMENTS_STEP;
    reset();
});
</script>

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

const ELEMENTS_STEP = 5;
const elementsVisible = ref(ELEMENTS_STEP);
const elementsToDisplay = computed(() =>
    filteredData.value.slice(0, elementsVisible.value)
);
const updateElementsVisible = () =>
    setTimeout(() => {
        if (!import.meta.client) return;
        elementsVisible.value = Math.min(
            elementsVisible.value + ELEMENTS_STEP,
            filteredData.value.length
        );
    });

const canLoadMore = computed(
    () => elementsVisible.value < filteredData.value.length
);

const list = ref<HTMLElement | null>(null);
const isElementVisible = useElementVisibility(list);

watchEffect(() => {
    if (isElementVisible.value && elementsVisible.value) {
        updateElementsVisible();
    }
});

watch(searchedIds, () => (elementsVisible.value = ELEMENTS_STEP));
</script>

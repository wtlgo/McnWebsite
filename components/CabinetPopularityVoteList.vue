<template>
    <v-row>
        <v-col md="auto" cols="12" class="flex-grow-1">
            <search-bar v-model="search" />
        </v-col>
        <v-col cols="auto">
            <v-checkbox
                v-model="filterVoted"
                label="Лайкнули меня"
                :disabled="checkDisabled"
            />
        </v-col>
        <v-col cols="auto">
            <v-btn :icon="mdiTooltipQuestion" variant="text" />
        </v-col>
    </v-row>

    <v-row v-if="filteredData.length">
        <v-col cols="1"> Место </v-col>
    </v-row>
    <mid-row v-else> Не найдено </mid-row>

    <cabinet-popularity-vote-list-item v-if="me" :item="me" />
    <v-divider v-if="me" class="my-3" />

    <cabinet-popularity-vote-list-item
        v-for="item in displayValues"
        :key="item.id"
        :item="item"
    />

    <mid-row>
        <v-progress-circular
            v-if="canLoadMore"
            color="primary"
            indeterminate
            ref="anchor"
        />
    </mid-row>
</template>

<script lang="ts" setup>
import { mdiTooltipQuestion } from "@mdi/js";
import type { PopularityVoteData } from "~/shared/types/popularity-vote-data";

const { items } = defineProps<{ items: PopularityVoteData[] }>();

const votedForMe = useApiPopularityVoteForMe();
const checkDisabled = computed(() => typeof votedForMe.value === "undefined");
const filterVoted = useBoolQuery("liked");

const search = ref("");
const searchedIds = useSearchVkIds(search);
const filteredData = useDisjunctiveFilter(
    () =>
        items.filter(({ id }) =>
            votedForMe.value && filterVoted.value
                ? votedForMe.value.includes(id)
                : true
        ),
    () => [
        ({ id }) => searchedIds.value.includes(id),
        ({ usernames }) =>
            usernames.some((u) => u.toLowerCase().includes(search.value)),
        ({ id }) => `${id}`.includes(search.value),
    ]
);

const user = useUser();
const me = computed(() =>
    filteredData.value.find((d) => d.id === user.value?.id)
);

const anchor = ref<HTMLElement | null>(null);
const { displayValues, canLoadMore } = useLoadingAnchor(anchor, filteredData);
</script>

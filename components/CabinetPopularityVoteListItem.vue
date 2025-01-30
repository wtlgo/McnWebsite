<template>
    <v-row>
        <v-col cols="1">
            <div class="d-flex justify-center">
                <h1>#{{ item.place }}</h1>
            </div>
        </v-col>
        <v-col>
            <v-card
                :title="fullName"
                :prepend-avatar="vkData?.photo_400 ?? vkNoPhoto"
                :subtitle="`Рейтинг: ${correctedRating}%`"
            >
                <template #append>
                    <lazy-vote-buttons :id="item.id" />
                </template>

                <template #text>
                    <div class="d-flex flex-wrap align-center ga-2">
                        <v-btn
                            :icon="siVk.path"
                            :color="`#${siVk.hex}`"
                            size="x-small"
                            :href="url"
                        />

                        <username-chip
                            v-for="name in item.usernames"
                            :key="name"
                            :name="name"
                        />
                    </div>
                </template>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { PopularityVoteData } from "~/shared/types/popularity-vote-data";
import vkNoPhoto from "~/assets/vk-no-photo.jpg";
import { siVk } from "simple-icons";

const { item } = defineProps<{ item: PopularityVoteData }>();

const vkData = useVkApiUserGet(() => item.id);
const fullName = computed(() =>
    vkData.value
        ? `${vkData.value.first_name} ${vkData.value.last_name}`
        : "..."
);
const url = computed(() => `https://vk.com/id${item.id}`);

const correctedRating = computed(() => Math.round(item.score * 100));
</script>

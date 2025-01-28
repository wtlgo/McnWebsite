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
                :subtitle="`Рейтинг: ${item.score}%`"
            >
                <template #append>
                    <v-btn
                        :icon="mdiThumbUpOutline"
                        variant="text"
                        color="success"
                    />

                    <v-btn
                        :icon="mdiThumbDownOutline"
                        variant="text"
                        color="error"
                    />
                </template>

                <template #text>
                    <div class="d-flex align-center ga-2">
                        <v-btn
                            :icon="siVk.path"
                            :color="`#${siVk.hex}`"
                            size="x-small"
                            :href="url"
                        />

                        <v-chip
                            v-for="name in item.usernames"
                            :key="name"
                            :color="colorHash(name)"
                        >
                            {{ name }}
                        </v-chip>
                    </div>
                </template>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { PopularityVoteData } from "~/shared/types/popularity-vote-data";
import vkNoPhoto from "~/assets/vk-no-photo.jpg";
import { mdiThumbDownOutline, mdiThumbUp, mdiThumbUpOutline } from "@mdi/js";
import { siVk } from "simple-icons";

const { item } = defineProps<{ item: PopularityVoteData }>();

const vkData = useVkApiUserGet(() => item.id);
const fullName = computed(() =>
    vkData.value
        ? `${vkData.value.first_name} ${vkData.value.last_name}`
        : "..."
);
const url = computed(() => `https://vk.com/id${item.id}`);
</script>

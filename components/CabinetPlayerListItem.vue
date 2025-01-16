<template>
    <v-col cols="auto">
        <v-card
            :title="item.name"
            :prepend-avatar="icon"
            :subtitle="fullName"
            :loading="!vkData"
            ref="target"
        >
            <template #append>
                <skin-button v-if="!!headUrl" :name="item.name">
                    <template #activator="{ props }">
                        <v-btn
                            v-bind="props"
                            :icon="mdiHumanHandsdown"
                            variant="plain"
                            color="green"
                            density="comfortable"
                        />
                    </template>
                </skin-button>

                <v-btn
                    :icon="siVk.path"
                    :href="`https://vk.com/id${item.vk}`"
                    variant="plain"
                    :color="`#${siVk.hex}`"
                    density="comfortable"
                />
            </template>
        </v-card>
    </v-col>
</template>

<script lang="ts" setup>
import { useElementVisibility } from "@vueuse/core";
import type { PlayerListData } from "~/shared/types/player-list-data";
import bedrock from "~/assets/bedrock.png";
import java from "~/assets/java.png";
import { siVk } from "simple-icons";
import { mdiHumanHandsdown } from "@mdi/js";

const target = ref<HTMLElement | null>(null);
const targetVisible = useElementVisibility(target);

const { item } = defineProps<{ item: PlayerListData }>();
const headUrl = useSkinHead(() => item.name);
const icon = computed(() => headUrl.value ?? (item.bedrock ? bedrock : java));
const vkData = useVkApiUserGet(() => item.vk, targetVisible);
const fullName = computed(() =>
    vkData.value
        ? `${vkData.value.first_name} ${vkData.value.last_name}`
        : "..."
);
</script>

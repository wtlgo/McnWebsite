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
                <v-btn
                    :icon="mdiLink"
                    variant="text"
                    density="compact"
                    :href="`https://vk.com/id${item.vk}`"
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
import { mdiLink } from "@mdi/js";

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

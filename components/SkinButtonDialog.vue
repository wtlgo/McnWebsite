<template>
    <v-card :title="`Скин ${profile.name}`">
        <template #text>
            <v-container fluid>
                <mid-row v-if="skin">
                    <skin-view
                        :skin="skin"
                        :height="maxHeight"
                        :width="maxHeight"
                    />
                </mid-row>
            </v-container>
        </template>

        <template #actions>
            <v-btn color="error" @click="onClose"> Закрыть </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";
const { profile } = defineProps<{ profile: VkUserItem }>();
const emit = defineEmits<{ (e: "close"): void }>();

const onClose = () => emit("close");

const dims = useDisplay();
const maxHeight = computed(() =>
    Math.min(250, dims.height.value / 2, dims.width.value * 0.8)
);

const skin = useApiSkin(() => profile.name);
</script>

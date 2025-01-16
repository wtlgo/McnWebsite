<template>
    <v-card :title="`Скин ${profile.name}`">
        <template #text>
            <v-container fluid>
                <mid-row>
                    <v-img
                        :height="maxHeight"
                        :width="maxHeight / 2"
                        :src="skinPart"
                    />
                </mid-row>
                <one-row>
                    <v-slider
                        v-model.number="sliderPos"
                        min="-2"
                        max="2"
                        step="1"
                    />
                </one-row>
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
const pSizes = computed(() => [
    250,
    dims.height.value / 2,
    dims.width.value * 0.8,
]);
const maxHeight = computed(() => Math.min(...pSizes.value));
const maxRender = computed(() => Math.max(...pSizes.value));

const skin = useSkinFullBody(() => profile.name, maxRender);

const sliderPos = ref(0);
const skinPart = computed(() => {
    if (!skin.value) return;
    switch (sliderPos.value) {
        case -2:
            return skin.value.back;
        case -1:
            return skin.value.left;
        case 0:
            return skin.value.front;
        case 1:
            return skin.value.right;
        case 2:
            return skin.value.back;
    }
});
</script>

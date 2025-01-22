<template>
    <canvas ref="canvas" v-bind="props" />
</template>

<script lang="ts" setup>
import { SkinViewer } from "skinview3d";

const { skin, width, height, ...props } = defineProps<{
    skin: string;
    width: number;
    height: number;
}>();
const canvas = ref<HTMLCanvasElement | null>(null);
const skinViewer = ref<SkinViewer | null>(null);

watchEffect((onCleanup) => {
    if (!canvas.value) return;
    onCleanup(() => skinViewer.value?.dispose());

    skinViewer.value = new SkinViewer({
        canvas: canvas.value,
        skin,
        width,
        height,
    });
});
</script>

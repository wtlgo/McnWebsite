<template>
    <component
        :is="VImg"
        :src="refinedSrc"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
    />
</template>

<script setup lang="ts">
import { VImg } from "vuetify/components";

const props = defineProps({
    src: {
        type: String,
        default: "",
    },
    alt: {
        type: String,
        default: "",
    },
    width: {
        type: [String, Number],
        default: undefined,
    },
    height: {
        type: [String, Number],
        default: undefined,
    },
});

const refinedSrc = computed(() => {
    return props.src;
});
</script>

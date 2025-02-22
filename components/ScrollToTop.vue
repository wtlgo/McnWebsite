<template>
    <v-fab
        v-if="showScrollTop"
        :icon="mdiChevronUp"
        app
        fixed
        color="primary"
        @click="y = 0"
    />
</template>

<script lang="ts" setup>
import { mdiChevronUp } from "@mdi/js";

const { y } = useWindowScroll({ behavior: "smooth" });
const showScrollTop = computed(() => y.value > 0);
</script>

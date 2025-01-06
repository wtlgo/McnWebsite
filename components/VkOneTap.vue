<style scoped>
.one-tap-container {
    max-width: 250px;
    flex-grow: 1;
}
</style>

<template>
    <div v-if="!auth.valid" class="one-tap-container" ref="el" />
</template>

<script lang="ts" setup>
import { OneTap, Scheme } from "@vkid/sdk";

const { auth } = useAuthData();

const el = ref<HTMLDivElement | null>(null);
watchEffect((onCleanup) => {
    if (!el.value) return;

    const oneTap = new OneTap();
    onCleanup(() => oneTap.close());

    oneTap.render({
        container: el.value,
        scheme: Scheme.DARK,
    });
});
</script>

<template>
    <div ref="el" />
    <v-progress-circular v-if="!ready" indeterminate color="#0077FF" />
</template>

<script lang="ts" setup>
import { OneTap, type OneTapParams } from "@vkid/sdk";

type Params = Omit<OneTapParams, "container">;
const props = defineProps<Params>();

const ready = usePrepareVkSdk();
const el = ref<HTMLDivElement | null>(null);
watchEffect((onCleanup) => {
    if (!el.value) return;
    if (!ready.value) return;

    const oneTap = new OneTap();
    onCleanup(() => oneTap.close());

    oneTap.render({
        ...props,
        container: el.value,
    });
});
</script>

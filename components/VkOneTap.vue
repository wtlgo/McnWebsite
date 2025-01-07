<style scoped>
.one-tap-container {
    max-width: 250px;
    flex-grow: 1;
}
</style>

<template>
    <v-card v-if="!auth.valid" title="Вход в систему">
        <template #text>
            <v-container fluid>
                <mid-row>
                    <div class="one-tap-container" ref="el" />
                </mid-row>
            </v-container>
        </template>
    </v-card>
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

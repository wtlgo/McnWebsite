<template>
    <v-card v-if="!user" title="Вход в систему">
        <template #text>
            <v-container fluid>
                <mid-row>
                    <div ref="el" />
                </mid-row>
            </v-container>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import { OneTap, Scheme } from "@vkid/sdk";

const user = useUser();

const el = ref<HTMLDivElement | null>(null);
watchEffect((onCleanup) => {
    if (!el.value) return;

    const oneTap = new OneTap();
    onCleanup(() => oneTap.close());

    oneTap.render({
        container: el.value,
        scheme: Scheme.DARK,
        showAlternativeLogin: true,
        width: 250,
    });
});
</script>

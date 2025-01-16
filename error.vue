<template>
    <NuxtLayout name="center">
        <v-empty-state
            headline="О нет!"
            :title="`Ошибка ${error.statusCode}`"
            :text="error.message"
            :icon="mdiEmoticonCry"
            action-text="На главную"
            @click:action="onMain"
        />
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { mdiEmoticonCry } from "@mdi/js";

const { error } = defineProps<{ error: NuxtError }>();

useHead({
    title: () => `${error.statusCode}: ${error.message} | Mikchan no Sekai`,
});

const onMain = () => clearError({ redirect: "/" });
</script>

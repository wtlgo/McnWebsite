<template>
    <NuxtLayout name="center">
        <v-card
            prepend-icon="$error"
            color="error"
            variant="text"
            :title="error.statusCode.toString()"
            :text="error.message"
        >
            <template #actions>
                <v-btn @click="onMain">На главную</v-btn>
            </template>
        </v-card>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps<{ error: NuxtError }>();

useHead({
    title: () => `${error.statusCode}: ${error.message} | Mikchan no Sekai`,
});

const onMain = () => clearError({ redirect: "/" });
</script>

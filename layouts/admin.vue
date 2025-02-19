<template>
    <v-app>
        <v-main minHeight="100vh">
            <slot />
        </v-main>
        <the-footer />
    </v-app>
</template>

<script lang="ts" setup>
import { accessAdminPanel } from "~/shared/utils/abilities.ts";

useHead({
    titleTemplate: (title) => `${title} | Админ-панель | Mikchan No Sekai`,
});

useAuthorize(accessAdminPanel);
</script>

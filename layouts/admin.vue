<template>
    <v-app>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
useHead({
    titleTemplate: (title) => `${title} | Админ-панель | Mikchan No Sekai`,
});

useAdminGuard();
</script>

<template>
    <v-app>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
useHead({
    titleTemplate: (title) => `${title} | Личный кабинет | Mikchan No Sekai`,
});

useMemberGuard();
</script>

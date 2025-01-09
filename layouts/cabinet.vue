<template>
    <v-app>
        <cabinet-app-bar v-model="drawer" />
        <cabinet-navigation v-model="drawer" />
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

const drawer = ref(false);
</script>

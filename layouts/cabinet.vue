<template>
    <v-app>
        <cabinet-app-bar v-model="drawerActive" />
        <cabinet-navigation v-model="drawerActive" />
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
const { mobile } = useDisplay();
const drawerActive = computed({
    get: () => !mobile.value || drawer.value,
    set: (val) => (drawer.value = val),
});
</script>

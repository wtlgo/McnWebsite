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
import { accessCabinet } from "~/shared/utils/abilities.ts";

useHead({
    titleTemplate: (title) => `${title} | Личный кабинет | Mikchan No Sekai`,
});

useAuthorize(accessCabinet);

const drawer = ref(false);
const { mobile } = useDisplay();
const drawerActive = computed({
    get: () => !mobile.value || drawer.value,
    set: (val) => (drawer.value = val),
});
</script>

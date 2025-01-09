<template>
    <v-navigation-drawer v-model="model">
        <template #prepend>
            <cabinet-navigation-header />
        </template>

        <v-divider />

        <cabinet-navigation-menu />

        <template #append>
            <cabinet-navigation-footer />
        </template>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>({ default: true });
</script>

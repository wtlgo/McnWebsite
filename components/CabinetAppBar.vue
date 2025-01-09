<template>
    <v-app-bar>
        <v-app-bar-nav-icon v-if="mobile" @click.stop="model = !model" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>({ default: false });

const fullTitle = useDocumentTitle("Личный Кабинет");
const title = computed(() => fullTitle.value.split("|")[0].trim());
const { mobile } = useDisplay();
</script>

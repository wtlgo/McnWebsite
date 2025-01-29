<template>
    <v-text-field
        label="Поиск"
        :prepend-inner-icon="mdiMagnify"
        v-model="search"
        clearable
        @click:clear="clear"
    />
</template>

<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";

const { search, clean, clear } = useSearchQuery("q");

const model = defineModel<string>();
watchEffect(() => (model.value = clean.value));
</script>

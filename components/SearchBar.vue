<template>
    <v-text-field
        label="Поиск"
        v-model="search"
        clearable
        @click:clear="search = ''"
    />
</template>

<script lang="ts" setup>
const { search, clean } = useSearchQuery("q");

const model = defineModel<string>();
watchEffect(() => (model.value = clean.value));
</script>

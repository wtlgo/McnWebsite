<template>
    <v-divider class="my-2" />
    <div class="d-flex flex-column ga-2" style="width: 100%">
        <p>Поменять скин</p>

        <skin-selector v-model="url" />

        <v-btn color="primary" :disabled="!url"> Загрузить </v-btn>
    </div>
</template>

<script lang="ts" setup>
const { name } = defineProps<{ name: string }>();

const emit = defineEmits<{ newSkin: [url: string | null] }>();

const url = ref<string | null>(null);
watchEffect(() => emit("newSkin", url.value));
</script>

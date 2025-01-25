<template>
    <v-divider class="my-2" />
    <div class="d-flex flex-column ga-2" style="width: 100%">
        <p>Поменять скин</p>

        <skin-selector :disabled="loading" v-model="url" />

        <v-btn
            color="primary"
            :disabled="!url || loading"
            :loading="loading"
            @click="onUpload"
        >
            Загрузить
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
const { name } = defineProps<{ name: string }>();

const emit = defineEmits<{ newSkin: [url: string | null] }>();

const url = ref<string | null>(null);
watchEffect(() => emit("newSkin", url.value));

const loading = ref(false);
const { change } = useApiChangeSkin();

const onUpload = () => {
    if (!url.value || loading.value) return;
    loading.value = true;

    change(
        { url: url.value, name },
        {
            onSettled() {
                loading.value = false;
            },
        }
    );
};
</script>

<template>
    <div v-if="res === TokenResult.PENDING">
        <v-alert type="info" variant="tonal" title="Выполняется вход...">
            <template v-slot:prepend>
                <v-progress-circular indeterminate />
            </template>
        </v-alert>
    </div>

    <div v-if="res === TokenResult.ERROR">
        <v-alert
            type="error"
            variant="tonal"
            title="Произошла ошибка"
            text="Не удалось войти. Пожалуйста, попробуйте позже."
            closable
            @click:close="onClose"
        />
    </div>

    <div v-if="res === TokenResult.SUCCESS">
        <v-alert
            type="success"
            variant="tonal"
            title="Вход выполнен успешно!"
        />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "center",
});

const res = useApiTokenListener();
const onClose = () => navigateTo("/");
watchEffect(() => {
    if (res.value === TokenResult.SUCCESS) {
        onClose();
    }
});
</script>

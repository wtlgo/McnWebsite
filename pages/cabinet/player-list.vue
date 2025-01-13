<template>
    <v-container>
        <mid-row v-if="isPending">
            <v-progress-circular color="primary" indeterminate />
        </mid-row>

        <mid-row v-else-if="isError">
            <v-alert
                type="error"
                title="Ошибка!"
                text="Не удалось загрузить данные. Повторите попытку позже."
            >
                <template #append>
                    <v-btn :icon="mdiReload" variant="text" @click="onReload" />
                </template>
            </v-alert>
        </mid-row>

        <client-only v-else>
            <cabinet-player-list :data="data" />

            <template #fallback>
                <mid-row>
                    <v-progress-circular color="primary" indeterminate />
                </mid-row>
            </template>
        </client-only>
    </v-container>
</template>

<script lang="ts" setup>
import { mdiReload } from "@mdi/js";

definePageMeta({
    layout: "cabinet",
});

useHead({ title: "Список игроков" });

const { data, isError, isPending, refetch } = useApiPlayerList();
const onReload = () => refetch();
</script>

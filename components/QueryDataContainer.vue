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
            />
        </mid-row>

        <slot v-else :data="safeData" />
    </v-container>
</template>

<script lang="ts" setup generic="TData, TError">
import type { UseQueryReturnType } from "@tanstack/vue-query";

const { query } = defineProps<{
    query: UseQueryReturnType<TData[], TError>;
}>();

const isPending = computed(() => query.isPending.value);
const isError = computed(() => query.isError.value);
const safeData = computed(() => query.data.value ?? []);
</script>

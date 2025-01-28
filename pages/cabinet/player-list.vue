<template>
    <query-data-container :query="query">
        <template #default="{ data }">
            <client-only>
                <cabinet-player-list :data="data" />

                <template #fallback>
                    <mid-row>
                        <v-progress-circular color="primary" indeterminate />
                    </mid-row>
                </template>
            </client-only>
        </template>
    </query-data-container>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "cabinet",
});

useHead({ title: "Список игроков" });

const query = useApiPlayerList();
</script>

<template>
    <query-data-container :query="query">
        <template #default="{ data }">
            <cabinet-popularity-vote-list :items="data" />
        </template>
    </query-data-container>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "cabinet",
});

useHead({ title: "Список игроков" });

const query = useApiPopularityVote();
</script>

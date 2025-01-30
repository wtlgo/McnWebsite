<template>
    <query-data-container :query="query">
        <template #default="{ data }">
            <cabinet-profiles :profiles="data" />
        </template>
    </query-data-container>
</template>

<script lang="ts" setup>
import { mdiReload } from "@mdi/js";

definePageMeta({
    layout: "cabinet",
});

useHead({ title: "Мои профили" });

const query = useApiProfiles();
</script>

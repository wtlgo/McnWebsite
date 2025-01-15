<template>
    <v-container>
        <mid-row>
            <v-alert
                variant="outlined"
                type="warning"
                title="Under Construction"
                text="Тут пока ничего нет, сайт в процессе активной разработки"
                :icon="mdiTrafficCone"
            />
        </mid-row>
    </v-container>
</template>

<script lang="ts" setup>
import { mdiTrafficCone } from '@mdi/js';

useHead({
    title: "Дешборд",
});

definePageMeta({
    layout: "cabinet",
});
</script>

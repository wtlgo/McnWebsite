<template>
    <v-container>
        <mid-row>
            <v-alert
                variant="outlined"
                type="warning"
                title="Under Construction"
                text="Тут пока ничего нет, сайт в процессе активной разработки"
            />
        </mid-row>
    </v-container>
</template>

<script lang="ts" setup>
useHead({
    title: "Дешборд",
});

definePageMeta({
    layout: "cabinet",
});
</script>

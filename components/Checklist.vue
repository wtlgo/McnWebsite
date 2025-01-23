<template>
    <v-list>
        <checklist-item v-for="(item, idx) in items" :key="idx" v-bind="item" />
    </v-list>
</template>

<script lang="ts" setup>
import type { ChecklistValue } from "~/shared/types/checklist";

const { items } = defineProps<{ items: ChecklistValue[] }>();
</script>

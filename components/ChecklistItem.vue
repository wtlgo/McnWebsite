<template>
    <v-list-item :title="title">
        <template #prepend>
            <v-icon :icon="icon" :color="color" />
        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { mdiCheckCircle, mdiCloseCircle, mdiProgressQuestion } from "@mdi/js";
import { ChecklistStatus, type ChecklistValue } from "~/shared/types/checklist";

const { title, status } = defineProps<ChecklistValue>();

const icon = computed(() => {
    switch (status) {
        case ChecklistStatus.VALID:
            return mdiCheckCircle;
        case ChecklistStatus.INVALID:
            return mdiCloseCircle;
        case ChecklistStatus.INDETERMINATE:
            return mdiProgressQuestion;
    }
});

const color = computed(() => {
    switch (status) {
        case ChecklistStatus.VALID:
            return "success";
        case ChecklistStatus.INVALID:
            return "error";
        case ChecklistStatus.INDETERMINATE:
            return "warning";
    }
});
</script>

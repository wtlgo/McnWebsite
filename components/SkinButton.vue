<template>
    <v-dialog max-width="500" persistent>
        <template #activator="{ props }">
            <slot name="activator" :props="props">
                <v-btn v-bind="props" :append-icon="mdiHumanHandsdown">
                    Скин
                </v-btn>
            </slot>
        </template>

        <template #default="{ isActive }">
            <skin-button-dialog :name="name" @close="isActive.value = false" />
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import { mdiHumanHandsdown } from "@mdi/js";

const { name, editable } = defineProps<{
    name: string;
    editable?: boolean;
}>();
</script>

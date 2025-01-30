<template>
    <v-dialog
        v-model="isActive"
        :activator="activator"
        max-width="500"
        :persistent="editable"
    >
        <template #activator="{ props }">
            <slot name="activator" :props="props" />
        </template>

        <template #default="{ isActive }">
            <skin-button-dialog
                :uuid="uuid"
                :name="name"
                :editable="editable"
                @close="isActive.value = false"
            />
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
const isActive = defineModel<boolean>();

const { name, uuid, editable, activator } = defineProps<{
    name: string;
    uuid?: string | null;
    editable?: boolean;
    activator?: Element | "parent";
}>();
</script>

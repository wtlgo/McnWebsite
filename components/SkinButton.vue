<template>
    <v-dialog max-width="500" persistent>
        <template #activator="{ props }">
            <v-btn v-bind="props" :append-icon="mdiHumanHandsdown">
                Скин
            </v-btn>
        </template>

        <template #default="{ isActive }">
            <skin-button-dialog
                :profile="profile"
                @close="isActive.value = false"
            />
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import { mdiHumanHandsdown } from "@mdi/js";
import type { VkUserItem } from "~/shared/types/vk-user-item";

const { profile } = defineProps<{ profile: VkUserItem }>();
</script>

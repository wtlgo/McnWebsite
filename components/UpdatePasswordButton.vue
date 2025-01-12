<template>
    <v-dialog max-width="500" persistent>
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                :disabled="isPremium"
                :append-icon="mdiFormTextboxPassword"
            >
                Обновить пароль
            </v-btn>
        </template>

        <template #default="{ isActive }">
            <update-password-button-dialog
                :profile="profile"
                @close="isActive.value = false"
            />
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";
import { mdiFormTextboxPassword } from "@mdi/js";

const { profile } = defineProps<{ profile: VkUserItem }>();
const isPremium = computed(() => !!profile.premium || !!profile.floodgate);
</script>

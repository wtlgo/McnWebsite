<template>
    <v-text-field
        :disabled="disabled"
        label="Ник"
        v-model="username"
        :prepend-icon="mdiAccount"
    />
</template>

<script lang="ts" setup>
const { disabled } = defineProps<{ disabled: boolean }>();

import { ChecklistStatus, type ChecklistValue } from "~/shared/types/checklist";
import { mdiAccount } from "@mdi/js";

const username = ref("");
const usernameDebounced = refDebounced(username, 1000);
const usernameClean = computed(() => usernameDebounced.value.trim());

const { skin, isLoading } = useApiResolveMinecraftSkin(
    usernameClean,
    () => !!usernameClean.value
);

const checks = computed<ChecklistValue[]>(() => [
    {
        title: "Скин найден",
        status: isLoading.value
            ? ChecklistStatus.INDETERMINATE
            : !!skin.value
            ? ChecklistStatus.VALID
            : ChecklistStatus.INVALID,
    },
]);

const model = defineModel<null | string>();
const checksModel = defineModel<ChecklistValue[]>("checks", {
    default: () => [],
});

watchEffect(() => (model.value = skin.value));
watchEffect(() => (checksModel.value = checks.value));
</script>

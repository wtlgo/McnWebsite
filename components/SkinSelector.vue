<template>
    <v-radio-group v-model="mode" inline>
        <v-radio label="Загрузить свой" :value="0" />
        <v-radio label="По ссылке" :value="1" />
        <v-radio label="По нику" :value="2" />
    </v-radio-group>

    <skin-selector-file
        v-if="mode === 0"
        :disabled="disabled"
        v-model="url"
        v-model:checks="checks"
    />
    <skin-selector-url
        v-if="mode === 1"
        :disabled="disabled"
        v-model="url"
        v-model:checks="checks"
    />
    <skin-selector-username
        v-if="mode === 2"
        :disabled="disabled"
        v-model="url"
        v-model:checks="checks"
    />

    <checklist :items="checks" />
</template>

<script lang="ts" setup>
import { ChecklistStatus, type ChecklistValue } from "~/shared/types/checklist";

const { disabled } = defineProps<{ disabled: boolean }>();

const checks = ref<ChecklistValue[]>([]);
const url = ref<string | null>(null);

const mode = ref(0);

const checksAreGood = computed(() =>
    checks.value.every((v) => v.status === ChecklistStatus.VALID)
);

const model = defineModel<null | string>({ default: null });
watchEffect(() => (model.value = checksAreGood.value ? url.value : null));
</script>

<template>
    <v-text-field v-model="url" label="Ссылка" :prepend-icon="mdiLink" />
</template>

<script lang="ts" setup>
import { ChecklistStatus, type ChecklistValue } from "~/shared/types/checklist";
import { mdiLink } from "@mdi/js";
import isUrl from "is-url-superb";
import sizeOf from "image-size";

const url = ref("");
const urlDebounced = refDebounced(url, 1000);
const urlClean = computed(() =>
    urlDebounced.value.trim().replace("http://", "https://")
);

const isValidUrl = computed(() => isUrl(urlClean.value));
const requestData = useRawRequest(urlClean, isValidUrl);
const sizeData = computedAsync(async () => {
    if (!requestData.value) return null;
    try {
        return await requestData.value
            .arrayBuffer()
            .then((ab) => new Uint8Array(ab))
            .then((u8a) => sizeOf(u8a));
    } catch (err) {
        console.error(err);
        return null;
    }
}, null);

const checks = computed(() => [
    {
        title: "PNG файл",
        status: (() => {
            if (!sizeData.value) return ChecklistStatus.INDETERMINATE;
            const { type } = sizeData.value;
            return type === "png"
                ? ChecklistStatus.VALID
                : ChecklistStatus.INVALID;
        })(),
    },
    {
        title: `Размер 64 на 64`,
        status: (() => {
            if (!sizeData.value) return ChecklistStatus.INDETERMINATE;
            const { width, height } = sizeData.value;
            return width === 64 && height === 64
                ? ChecklistStatus.VALID
                : ChecklistStatus.INVALID;
        })(),
    },
    {
        title: "Ссылка доступна",
        status: !!requestData.value
            ? ChecklistStatus.VALID
            : ChecklistStatus.INDETERMINATE,
    },
    {
        title: "Ссылка валидна",
        status: !!isValidUrl.value
            ? ChecklistStatus.VALID
            : ChecklistStatus.INVALID,
    },
]);

const model = defineModel<null | string>();
const checksModel = defineModel<ChecklistValue[]>("checks", {
    default: () => [],
});

watchEffect(() => (model.value = urlClean.value));
watchEffect(() => (checksModel.value = checks.value));
</script>

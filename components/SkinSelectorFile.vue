<template>
    <v-file-input
        :disabled="disabled"
        v-model="file"
        label="Файл скина"
        accept="image/png"
    >
        <template #selection="{ fileNames }">
            <p
                class="text-truncate"
                v-for="(fileName, idx) in fileNames"
                :key="idx"
            >
                {{ fileName }}
            </p>
        </template>
    </v-file-input>
</template>

<script lang="ts" setup>
import { ChecklistStatus, type ChecklistValue } from "~/shared/types/checklist";
import sizeOf from "image-size";

const { disabled } = defineProps<{ disabled: boolean }>();

const file = ref<File | null>(null);
const fileBytes = useFileData(file);

const initialChecks = computed<ChecklistValue[]>(() => [
    {
        title: "PNG файл",
        status: (() => {
            if (!file.value) return ChecklistStatus.INDETERMINATE;
            return file.value.type === "image/png"
                ? ChecklistStatus.VALID
                : ChecklistStatus.INVALID;
        })(),
    },
    {
        title: `Размер 64 на 64`,
        status: (() => {
            if (!fileBytes.value) return ChecklistStatus.INDETERMINATE;
            try {
                const { width, height } = sizeOf(fileBytes.value);
                return width === 64 && height === 64
                    ? ChecklistStatus.VALID
                    : ChecklistStatus.INVALID;
            } catch (err) {
                console.error(err);
                return ChecklistStatus.INVALID;
            }
        })(),
    },
    {
        title: "Меньше 5MB",
        status: (() => {
            if (!file.value) return ChecklistStatus.INDETERMINATE;
            const maxSizeInBytes = 5 * 1024 * 1024;
            return file.value.size <= maxSizeInBytes
                ? ChecklistStatus.VALID
                : ChecklistStatus.INVALID;
        })(),
    },
]);

const { uploadImgurAsync } = useImgurUploader();
const readyToUpload = computed(() =>
    initialChecks.value.every((v) => v.status === ChecklistStatus.VALID)
);
const url = asyncComputed(async () => {
    if (!file.value) return null;
    if (!readyToUpload.value) return null;
    return uploadImgurAsync(file.value);
}, null);

const checks = computed(() => [
    ...initialChecks.value,
    {
        title: "Файл доступен",
        status: readyToUpload.value
            ? url.value
                ? ChecklistStatus.VALID
                : ChecklistStatus.INDETERMINATE
            : ChecklistStatus.INVALID,
    },
]);

const model = defineModel<null | string>();
const checksModel = defineModel<ChecklistValue[]>("checks", {
    default: () => [],
});

watchEffect(() => (model.value = url.value));
watchEffect(() => (checksModel.value = checks.value));
</script>

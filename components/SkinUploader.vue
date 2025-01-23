<template>
    <v-divider class="my-2" />
    <div class="d-flex flex-column ga-2">
        <p>Поменять скин</p>
        <v-radio-group v-model="uploadOwn" inline>
            <v-radio label="Загрузить свой" :value="true" />
            <v-radio label="По ссылке" :value="false" />
        </v-radio-group>

        <v-file-input
            v-model="file"
            v-if="uploadOwn"
            label="File input"
            accept="image/png"
            :rules="[ruleFile]"
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

        <v-btn v-if="uploadOwn" color="primary" :disabled="!uploadEnabled">
            Загрузить
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { mdiTrafficCone } from "@mdi/js";

const { name } = defineProps<{ name: string }>();

const uploadOwn = ref(true);
const file = ref<File | null>(null);
const fileValidation = useValidateMinecraftSkin(file);

const uploadEnabled = computed(() => !!fileValidation.value?.isValid);
const ruleFile = () => fileValidation.value?.errors?.at(0) ?? true;

/*
const { upload } = useImgurUploader();
const onUpload = () => {
    if (!file.value || !fileValidation.value?.isValid) return;
    upload({
        image: fileToReadableStream(file.value),
        type: "stream",
    });
};
*/
</script>

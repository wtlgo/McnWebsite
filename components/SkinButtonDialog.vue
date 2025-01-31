<template>
    <v-card :title="`Скин ${name}`">
        <template #append>
            <v-btn
                :icon="mdiReload"
                size="small"
                variant="text"
                :loading="refetchLoading"
                @click="onRefetch"
            />
        </template>

        <template #text>
            <v-container fluid>
                <mid-row>
                    <div class="d-flex flex-column ga-2">
                        <p>Превью</p>
                        <skin-preview-box
                            :size="maxHeight"
                            :skin="previewSkin"
                        />
                    </div>
                </mid-row>

                <mid-row v-if="canUpload">
                    <skin-uploader
                        v-if="uuid"
                        :name="name"
                        @new-skin="onNewSkin"
                        :key="skin ?? '-'"
                    />
                    <div v-else>
                        <v-divider class="py-2" />
                        Ты должен зайти на сервер под этим ником хотя бы раз,
                        чтобы иметь возможность сменить скин
                    </div>
                </mid-row>
            </v-container>
        </template>

        <template #actions>
            <v-btn color="error" @click="onClose"> Закрыть </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import { mdiReload } from "@mdi/js";

const { name, editable } = defineProps<{
    name: string;
    uuid?: string | null;
    editable?: boolean;
}>();
const emit = defineEmits<{ (e: "close"): void }>();

const onClose = () => emit("close");

const dims = useDisplay();
const maxHeight = computed(() =>
    Math.min(250, dims.height.value / 2, dims.width.value * 0.8)
);

const { skin, refetch } = useApiSkin(() => name);
const newSkin = ref<string | null>(null);
const previewSkin = computed(() => newSkin.value ?? skin.value);
const onNewSkin = (url: string | null) => (newSkin.value = url);

const { data } = useApiProfiles();
const canUpload = computed(() => {
    if (!editable) return false;
    const profile = data.value?.find((v) => v.name === name);
    if (!profile) return false;
    return !profile.premium || !!profile.floodgate;
});
7;

const refetchLoading = ref(false);
const onRefetch = () => {
    if (refetchLoading.value) return;
    refetchLoading.value = true;
    refetch(undefined, {
        onSettled() {
            refetchLoading.value = false;
        },
    });
};
</script>

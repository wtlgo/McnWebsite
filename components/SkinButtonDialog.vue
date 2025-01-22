<template>
    <v-card :title="`Скин ${name}`">
        <template #text>
            <v-container fluid>
                <mid-row v-if="!!skin">
                    <div class="d-flex flex-column ga-2">
                        <p>Превью</p>
                        <skin-view
                            style="
                                border-color: white;
                                border-width: 1px;
                                border-style: solid;
                            "
                            :skin="skin"
                            :height="maxHeight"
                            :width="maxHeight"
                        />
                    </div>
                </mid-row>
                <mid-row v-else> Скин не установлен </mid-row>

                <mid-row v-if="canUpload">
                    <skin-uploader :name="name" />
                </mid-row>
            </v-container>
        </template>

        <template #actions>
            <v-btn color="error" @click="onClose"> Закрыть </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
const { name } = defineProps<{ name: string }>();
const emit = defineEmits<{ (e: "close"): void }>();

const onClose = () => emit("close");

const dims = useDisplay();
const maxHeight = computed(() =>
    Math.min(250, dims.height.value / 2, dims.width.value * 0.8)
);

const skin = useApiSkin(() => name);
const { data } = useApiProfiles();
const canUpload = computed(() => {
    const profile = data.value.find((v) => v.name === name);
    if (!profile) return false;
    return !profile.premium || !!profile.floodgate;
});
</script>

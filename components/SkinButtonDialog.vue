<template>
    <v-card :title="`Скин ${name}`">
        <template #text>
            <v-container fluid>
                <mid-row v-if="skin">
                    <skin-view
                        :skin="skin"
                        :height="maxHeight"
                        :width="maxHeight"
                    />
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
</script>

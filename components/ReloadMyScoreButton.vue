<template>
    <v-btn
        v-if="visible"
        :icon="mdiReload"
        variant="text"
        color="yellow"
        :loading="loading"
        @click="onReload"
    />
</template>

<script lang="ts" setup>
import { mdiReload } from "@mdi/js";

const { id } = defineProps<{ id: number }>();
const user = useUser();
const visible = computed(() => id === user.value?.id);
const { refetchMyScore } = useApiScore();
const loading = useState("relad-my-score-button__loading", () => false);
const onReload = () => {
    if (loading.value) return;
    loading.value = true;
    refetchMyScore(undefined, {
        onSettled() {
            loading.value = false;
        },
    });
};
</script>

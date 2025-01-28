<template>
    <div class="d-flex ga-2" ref="el">
        <v-btn
            :icon="like ? mdiThumbUp : mdiThumbUpOutline"
            variant="text"
            color="success"
            @click="onLike"
        />

        <v-btn
            :icon="dislike ? mdiThumbDown : mdiThumbDownOutline"
            variant="text"
            color="error"
            @click="onDislike"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    mdiThumbDown,
    mdiThumbDownOutline,
    mdiThumbUp,
    mdiThumbUpOutline,
} from "@mdi/js";

const { id } = defineProps<{ id: number }>();

const el = ref<HTMLElement | null>(null);
const visible = useElementVisibility(el);

const vote = useApiPopularityVoteMyVote(() => id, visible);

const like = computed(() => vote.value === 1);
const dislike = computed(() => vote.value === -1);

const onLike = () => (vote.value = like.value ? 0 : 1);
const onDislike = () => (vote.value = dislike.value ? 0 : -1);
</script>

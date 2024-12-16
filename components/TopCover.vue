<style lang="css" scoped>
.image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 20vh;
}
</style>

<template>
    <v-row no-gutters>
        <v-col>
            <div class="image" :style="style" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
const cover = useGroupCover();
const style = computed(() => ({
    backgroundImage: `url(${cover.value.url})`,
    minHeight: `min(128px, ${cover.value.height}px)`,
}));
</script>

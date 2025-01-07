<style lang="css" scoped>
.image {
    width: 100%;
    height: 20vh;
    min-height: 128px;
}

.full-width-row {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -16px !important;
}
</style>

<template>
    <v-row no-gutters class="full-width-row">
        <v-col>
            <v-img :src="cover.url" class="image" cover />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
const cover = useGroupCover();
</script>

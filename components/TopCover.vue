<style lang="css" scoped>
.image {
    width: 100%;
    height: 20vh;
    min-height: 128px;
}
</style>

<template>
    <v-row no-gutters>
        <v-col>
            <v-img :src="cover.url" class="image" cover />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
const cover = useGroupCover();
</script>

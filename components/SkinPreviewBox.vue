<style scoped>
.bordered {
    border-color: white;
    border-width: 1px;
    border-style: solid;
}
</style>

<template>
    <skin-view
        v-if="!!skin"
        class="bordered"
        :skin="skin"
        :height="size"
        :width="size"
    />
    <div
        v-else
        class="d-flex align-center justify-center bordered"
        :style="{
            height: `${size}px`,
            width: `${size}px`,
        }"
    >
        <p>Скин не установлен</p>
    </div>
</template>

<script lang="ts" setup>
const { size, skin } = defineProps<{ size: number; skin?: string | null }>();
</script>

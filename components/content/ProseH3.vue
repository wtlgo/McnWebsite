<template>
    <h3 class="pt-4 pb-2" :id="props.id">
        <a
            class="app-link text-decoration-none text-white"
            v-if="props.id"
            :href="`#${props.id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h3>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>();
</script>

<template>
    <h5 class="pt-2 pb-2" :id="props.id">
        <a
            class="app-link text-decoration-none text-white"
            v-if="props.id"
            :href="`#${props.id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h5>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>();
</script>

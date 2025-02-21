<template>
    <h4 :id="props.id">
        <a
            class="app-link text-decoration-none text-white"
            v-if="props.id"
            :href="`#${props.id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h4>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>();
</script>

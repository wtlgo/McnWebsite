<style lang="css" scoped>
.icon {
    font-size: 0.875rem;
    height: 0.875rem;
    width: 0.875rem;
}
</style>

<template>
    <nuxt-link
        class="app-link text-decoration-none text-primary font-weight-medium d-inline-flex align-center"
        :href="props.href"
        :target="props.target ?? undefined"
    >
        <slot />
        <v-icon
            v-if="isExternal"
            class="icon text-primary ms-1"
            :icon="mdiLinkVariant"
        />
    </nuxt-link>
</template>

<script setup lang="ts">
import { mdiLinkVariant } from "@mdi/js";

const props = defineProps({
    href: {
        type: String,
        default: "",
    },
    target: {
        type: String as PropType<
            | "_blank"
            | "_parent"
            | "_self"
            | "_top"
            | (string & object)
            | null
            | undefined
        >,
        default: undefined,
        required: false,
    },
});

const isExternal = computed(() => {
    try {
        const url = new URL(props.href, window.location.origin);
        return url.origin !== window.location.origin;
    } catch (error) {
        return false;
    }
});
</script>

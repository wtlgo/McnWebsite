<template>
    <v-row>
        <v-col>
            <slot />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import type { VRowProps } from "vuetify/lib/components/VRow";
import type { VColProps } from "vuetify/lib/components/VCol";

const { row, col } = defineProps<{ row?: VRowProps; col?: VColProps }>();
</script>

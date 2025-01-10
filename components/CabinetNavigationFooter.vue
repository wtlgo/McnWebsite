<template>
    <div class="pa-2">
        <v-btn flat block :prepend-icon="mdiHome" to="/"> На главную </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { mdiHome } from "@mdi/js";
</script>

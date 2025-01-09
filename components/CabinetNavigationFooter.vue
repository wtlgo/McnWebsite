<template>
    <div class="pa-2">
        <v-btn flat block :prepend-icon="mdiHome" @click="onClick">
            На заглавную
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { mdiHome } from "@mdi/js";

const router = useRouter();
const onClick = () => router.push("/");
</script>

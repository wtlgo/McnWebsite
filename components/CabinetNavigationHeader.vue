<template>
    <v-list-item
        v-if="auth.valid"
        :title="auth.name"
        :subtitle="auth.gameTitle"
        :prepend-avatar="auth.photo"
    >
        <template #append>
            <v-btn
                :icon="mdiLogout"
                variant="text"
                color="red"
                @click="onLogout"
            />
        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { mdiLogout } from "@mdi/js";
const { auth, token } = useAuthData();
const onLogout = () => (token.value = null);
</script>

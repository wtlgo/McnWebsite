<template>
    <v-list-item
        v-if="auth.valid"
        :title="auth.name"
        :subtitle="role"
        :prepend-avatar="auth.photo"
    >
        <template #append>
            <v-btn
                :icon="mdiLogoutVariant"
                variant="text"
                color="red"
                @click="onLogout"
            />
        </template>
    </v-list-item>
</template>

<script lang="ts" setup>
import { mdiLogoutVariant } from "@mdi/js";
const { auth, token } = useAuthData();
const onLogout = () => (token.value = null);
const role = computed(() => {
    if (!auth.value.valid) return "Кто?";
    if (auth.value.isAdmin) return "Администратор";
    if (auth.value.isMember) return "Игрок";
    return "Гость";
});
</script>

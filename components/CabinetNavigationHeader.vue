<template>
    <v-list-item
        v-if="user"
        :title="user.name"
        :subtitle="user.gameTitle"
        :prepend-avatar="user.photo"
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
const user = useUser();
const token = useToken();
const onLogout = () => (token.value = null);
</script>

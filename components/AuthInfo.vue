<template>
    <v-card
        v-if="auth.valid"
        :prepend-avatar="auth.photo"
        :title="`Добро пожаловать, ${auth.name}!`"
        :subtitle="auth.isAdmin ? 'Администратор' : 'Игрок'"
    >
        <template #actions>
            <v-btn color="red" @click="onExit">Выйти</v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
const { auth, token } = useAuthData();
const onExit = () => (token.value = null);
</script>

<template>
    <v-list-item
        v-if="auth.valid"
        title="Личный кабинет"
        :subtitle="`Добро пожаловать, ${auth.name}!`"
        :prepend-avatar="auth.photo"
    />
</template>

<script lang="ts" setup>
const { auth } = useAuthData();
</script>

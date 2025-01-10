<template>
    <v-card
        v-if="auth.valid"
        :prepend-avatar="auth.photo"
        :title="`Добро пожаловать, ${auth.name}!`"
        :subtitle="subtitle"
    >
        <template #actions>
            <v-btn color="red" @click="onExit">Выйти</v-btn>
        </template>

        <template #text>
            <v-container fluid>
                <v-row>
                    <v-col cols="auto" v-if="!auth.isMember">
                        <v-btn color="primary"> Правила </v-btn>
                    </v-col>
                    <v-col cols="auto" v-if="!auth.isMember">
                        <v-btn color="primary">
                            Подать заявку на вступление
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" v-if="auth.isMember">
                        <v-btn color="primary" to="/cabinet">
                            Личный Кабинет
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" v-if="auth.isAdmin">
                        <v-btn color="primary" to="/admin">
                            Админ Панель
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
const { auth, token } = useAuthData();

const subtitle = computed(() => {
    if (!auth.value.valid) return "Неизвестный";
    if (auth.value.isAdmin) return "Администратор";
    if (auth.value.isMember) return "Игрок";
    return "Гость";
});

const onExit = () => (token.value = null);
</script>

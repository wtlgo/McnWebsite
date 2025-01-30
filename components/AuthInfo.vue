<template>
    <v-card
        v-if="user"
        :prepend-avatar="user.photo"
        :title="`Добро пожаловать, ${user.name}!`"
        :subtitle="user.gameTitle"
    >
        <template #actions>
            <v-btn color="red" @click="onExit">Выйти</v-btn>
        </template>

        <template #text>
            <v-container fluid>
                <v-row>
                    <can :ability="accessRuleBook">
                        <v-col cols="auto">
                            <v-btn color="primary"> Правила </v-btn>
                        </v-col>
                    </can>

                    <can :ability="accessEnrtyForm">
                        <v-col cols="auto">
                            <v-btn color="primary">
                                Подать заявку на вступление
                            </v-btn>
                        </v-col>
                    </can>

                    <can :ability="accessCabinet">
                        <v-col cols="auto">
                            <v-btn color="primary" to="/office">
                                Личный Кабинет
                            </v-btn>
                        </v-col>
                    </can>

                    <can :ability="accessAdminPanel">
                        <v-col cols="auto">
                            <v-btn color="primary" to="/admin">
                                Админ Панель
                            </v-btn>
                        </v-col>
                    </can>
                </v-row>
            </v-container>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import {
    accessAdminPanel,
    accessCabinet,
    accessEnrtyForm,
    accessRuleBook,
} from "~/shared/utils/abilities.ts";

const user = useUser();
const token = useToken();
const onExit = () => (token.value = null);
</script>

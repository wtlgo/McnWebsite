<template>
    <v-container>
        <top-cover />

        <v-row>
            <v-col cols="12" md="12" lg="4">
                <server-stat ip="play.mikchan.net" />
            </v-col>
            <v-col cols="12" md="6" lg="4">
                <server-stat ip="mods.mikchan.net" />
            </v-col>
            <v-col cols="12" md="6" lg="4">
                <server-stat ip="creative.mikchan.net" />
            </v-col>
        </v-row>

        <mid-row v-if="auth.valid"> <auth-info /> </mid-row>
        <mid-row v-else> <vk-one-tap /> </mid-row>

        <mid-row>
            <v-alert
                :icon="mdiTrafficCone"
                variant="outlined"
                type="warning"
                title="Under Construction"
                text="Сайт в процессе активной разработки. Сейчас доступен только базовый функционал. Выгу выгу"
            />
        </mid-row>
    </v-container>
</template>

<script lang="ts" setup>
import { mdiTrafficCone } from "@mdi/js";

const { auth } = useAuthData();
</script>

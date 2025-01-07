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
    </v-container>
</template>

<script lang="ts" setup>
const { auth } = useAuthData();
</script>

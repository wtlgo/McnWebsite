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

        <v-row v-if="auth.valid">
            <v-spacer />
            <v-col cols="auto"> <auth-info /> </v-col>
            <v-spacer />
        </v-row>
        <v-row v-else>
            <v-spacer />
            <v-col cols="auto"> <vk-one-tap /> </v-col>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
const { auth } = useAuthData();
</script>

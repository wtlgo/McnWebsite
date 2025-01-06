<template>
    <v-container>
        <top-cover />
        <v-row>
            <vk-one-tap />
        </v-row>
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
    </v-container>
</template>

<script lang="ts" setup></script>

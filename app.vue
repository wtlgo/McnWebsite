<template>
    <v-app>
        <v-container>
            <top-cover />
            <v-row>
                <v-col> <server-stat ip="play.mikchan.net" /> </v-col>
                <v-col> <server-stat ip="mods.mikchan.net" /> </v-col>
                <v-col> <server-stat ip="creative.mikchan.net" /> </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
useHead({
    title: "Mikchan no Sekai",
});
</script>

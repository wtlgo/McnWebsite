<template>
    <v-footer class="text-center d-flex flex-column ga-3">
        <div class="d-flex ga-3">
            <v-btn
                :icon="siVk.path"
                variant="text"
                href="https://vk.com/mikchanno"
            />

            <v-btn
                :icon="siDiscord.path"
                variant="text"
                href="https://discord.gg/RpxberK5ZS"
            />

            <v-btn
                :icon="siYoutube.path"
                variant="text"
                href="https://www.youtube.com/@MikChanNoSekai"
            />

            <v-btn
                :icon="siTiktok.path"
                variant="text"
                href="https://www.tiktok.com/@mikchannosekai"
            />
        </div>
        <v-divider />
        <div>
            {{ new Date().getFullYear() }} — <strong>MikChan no Sekai</strong>
        </div>
    </v-footer>
</template>

<script setup lang="ts">
import { siVk, siDiscord, siYoutube, siTiktok } from "simple-icons";
</script>

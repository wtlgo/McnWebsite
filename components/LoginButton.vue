<template>
    <v-card v-if="!user" title="Вход в систему">
        <template #text>
            <v-container fluid>
                <mid-row>
                    <vk-one-tap
                        :scheme="Scheme.DARK"
                        :styles="{ width: 250 }"
                        show-alternative-login
                        fast-auth-enabled
                    />
                </mid-row>
            </v-container>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import { Scheme } from "@vkid/sdk";
const user = useUser();
</script>

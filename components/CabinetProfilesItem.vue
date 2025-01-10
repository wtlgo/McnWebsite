<template>
    <v-card :title="profile.name" :prepend-avatar="steve">
        <template #text>
            <div class="d-flex ga-2">
                <v-chip
                    color="yellow"
                    :prepend-icon="mdiLicense"
                    v-if="isPremium"
                >
                    Лицензионный аккаунт
                </v-chip>
                <v-chip color="red" :prepend-icon="mdiPirate" v-else>
                    Пиратский аккаунт
                </v-chip>

                <v-chip color="grey" :prepend-avatar="bedrock" v-if="isBedrock">
                    Bedrock Edition
                </v-chip>
                <v-chip color="green" :prepend-avatar="java" v-else>
                    Java Edition
                </v-chip>
            </div>
        </template>

        <template #actions>
            <v-btn :disabled="isPremium" :append-icon="mdiFormTextboxPassword">
                Обновить пароль
            </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";
import bedrock from "~/assets/bedrock.png";
import java from "~/assets/java.png";
import steve from "~/assets/steve.jpg";
import { mdiLicense, mdiPirate, mdiFormTextboxPassword } from "@mdi/js";

const { profile } = defineProps<{ profile: VkUserItem }>();
const icon = computed(() => (profile.floodgate ? bedrock : java));

const isPremium = computed(() => !!profile.premium || !!profile.floodgate);
const isBedrock = computed(() => !!profile.floodgate);
</script>

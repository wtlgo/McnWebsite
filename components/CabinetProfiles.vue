<template>
    <mid-row v-if="profiles.length === 0">
        <v-alert title="Профилей не найдено" type="info">
            <template #text>
                Список твоих игровых профилей пуст. Для того, чтобы профиль
                появился в списке, зайди под тем ником, который ты указал в
                анкете, на любой из серверов. Если профиль всё ещё не
                появляется, сообщи об этом администрации в
                <v-btn
                    href="https://vk.com/im?sel=-197680365"
                    variant="text"
                    density="compact"
                >
                    личных сообщениях паблика </v-btn
                >.
            </template>
        </v-alert>
    </mid-row>
    <v-row v-else>
        <v-col cols="auto" v-for="(profile, idx) in profiles" :key="idx">
            <cabinet-profiles-item :profile="profile" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";

const { profiles } = defineProps<{ profiles: VkUserItem[] }>();
</script>

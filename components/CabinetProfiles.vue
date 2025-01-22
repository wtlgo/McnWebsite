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
                    личных сообщениях группы
                </v-btn>
            </template>
        </v-alert>
    </mid-row>
    <v-row v-else>
        <v-col md="6" cols="12" v-for="(profile, idx) in profiles" :key="idx">
            <cabinet-profiles-item :profile="profile" />
        </v-col>
    </v-row>

    <mid-row v-if="profiles.length > 0">
        <v-alert type="info" variant="outlined">
            <template #text>
                <p>Каждому игроку дозволено иметь:</p>
                <ol class="px-7">
                    <li>
                        Один лицензионный или пиратский Java Edition аккаунт
                    </li>
                    <li>Один Bedrock Edition аккаунт</li>
                    <li>
                        Второй лицензионный Java Edition аккаунт, если первый
                        аккаунт, который был добавлен, был пиратским, а новый
                        лицензионный аккаунт с таким же именем получить
                        невозможно
                    </li>
                </ol>
                <p>
                    Чтобы добавить ещё один профиль в список, или исправить
                    некорректные данные (например, если у тебя лицензионный
                    аккаунт, а он отображается как пиратский), необходимо
                    обратиться в
                    <a href="https://vk.com/im?sel=-197680365"
                        >личные сообщения группы</a
                    >.
                </p>
            </template>
        </v-alert>
    </mid-row>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";

const { profiles } = defineProps<{ profiles: VkUserItem[] }>();
</script>

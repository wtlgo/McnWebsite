<template>
    <v-card :title="profile.name" :prepend-avatar="avatar">
        <template #text>
            <div class="d-flex ga-2">
                <v-chip
                    color="yellow"
                    :prepend-icon="mdiLicense"
                    v-if="isPremium"
                >
                    Лицензионный аккаунт

                    <v-tooltip
                        activator="parent"
                        location="bottom start"
                        max-width="250"
                    >
                        Лицензионный аккаунт Minecraft — это официально
                        зарегистрированная учётная запись, приобретённая через
                        Mojang или Microsoft, предоставляющая доступ к полным
                        возможностям игры и её обновлениям. Лицензионным
                        аккаунтам не нужно вводить пароль при входе на сервер.
                    </v-tooltip>
                </v-chip>
                <v-chip color="red" :prepend-icon="mdiPirate" v-else>
                    Пиратский аккаунт

                    <v-tooltip
                        activator="parent"
                        location="bottom start"
                        max-width="250"
                    >
                        Пиратский аккаунт Minecraft — это неофициальная учётная
                        запись, позволяющая играть в игру без покупки лицензии,
                        обычно через взломанный клиент. Пиратским аккаунтам при
                        входе на сервер нужно вводить пароль командой
                        <code>/login [пароль]</code>.
                    </v-tooltip>
                </v-chip>

                <v-chip color="grey" :prepend-avatar="bedrock" v-if="isBedrock">
                    Bedrock Edition

                    <v-tooltip
                        activator="parent"
                        location="bottom start"
                        max-width="250"
                    >
                        Minecraft: Bedrock Edition — многоплатформенная версия
                        игры, оптимизированная для различных устройств, таких
                        как Windows 10, Xbox, PlayStation, Nintendo Switch, iOS,
                        Android и VR-гарнитуры.
                    </v-tooltip>
                </v-chip>
                <v-chip color="green" :prepend-avatar="java" v-else>
                    Java Edition

                    <v-tooltip
                        activator="parent"
                        location="bottom start"
                        max-width="250"
                    >
                        Minecraft: Java Edition — изначальная версия Minecraft,
                        разработанная компанией Mojang Studios для Windows,
                        macOS и Linux.
                    </v-tooltip>
                </v-chip>
            </div>
        </template>

        <template #actions>
            <update-password-button :profile="profile" />
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";
import bedrock from "~/assets/bedrock.png";
import java from "~/assets/java.png";
import steve from "~/assets/steve.jpg";
import { mdiLicense, mdiPirate } from "@mdi/js";

const { profile } = defineProps<{ profile: VkUserItem }>();

const isPremium = computed(() => !!profile.premium || !!profile.floodgate);
const isBedrock = computed(() => !!profile.floodgate);

const headUrl = useSkinHead(() => profile.name, 64);
const avatar = computed(() => headUrl.value ?? steve);
</script>

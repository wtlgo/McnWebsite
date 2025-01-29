<style scoped>
.multi-line {
    white-space: pre-line;
}
</style>

<template>
    <v-card :title="`Обновить пароль ${profile.name}`">
        <template #text>
            <v-alert
                v-model="errorVisible"
                class="mb-4 multi-line"
                type="error"
                title="Произошла ошибка!"
                :text="error ?? ''"
                closable
                variant="tonal"
            />
            <v-form>
                <v-text-field
                    type="password"
                    label="Новый пароль"
                    v-model="password1"
                    :disabled="disabled"
                />
                <v-text-field
                    type="password"
                    label="Новый пароль ещё раз"
                    v-model="password2"
                    :disabled="disabled"
                />
            </v-form>
        </template>

        <template #actions>
            <v-btn
                color="success"
                @click="onChangePassword"
                :loading="loading"
                :disabled="disabled"
            >
                Отправить
            </v-btn>
            <v-btn color="error" @click="onClose" :disabled="disabled">
                Отменить
            </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { VkUserItem } from "~/shared/types/vk-user-item";
const { profile } = defineProps<{ profile: VkUserItem }>();
const emit = defineEmits<{ (e: "close"): void }>();

const password1 = ref("");
const password2 = ref("");

const loading = ref(false);
const { error, errorVisible } = useErrorPair();
const disabled = computed(() => loading.value);

const { changePassword } = useApiChangePassword();

const onClose = () => emit("close");
const onChangePassword = () => {
    if (loading.value) return;
    if (disabled.value) return;

    loading.value = true;
    errorVisible.value = false;

    changePassword(
        {
            name: profile.name,
            password1: password1.value,
            password2: password2.value,
        },
        {
            onSuccess() {
                onClose();
            },
            onError(err) {
                error.value = getErrorMessage(err);
            },
            onSettled() {
                loading.value = false;
            },
        }
    );
};
</script>

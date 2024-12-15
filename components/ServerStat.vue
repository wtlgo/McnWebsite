<template>
    <v-card :prepend-avatar="data?.icon">
        <template v-slot:title>
            <span>{{ ip }}</span>
            <v-icon class="mx-2" size="1em" :icon="icon" :color="iconColor" />
        </template>

        <template v-slot:subtitle>
            Игроков: {{ data?.players.online ?? 0 }} из
            {{ data?.players.max ?? 0 }}
        </template>

        <template v-slot:text>
            <v-progress-linear
                :model-value="data?.players.online ?? 0"
                :max="data?.players.max ?? 0"
                :indeterminate="status == Status.PENDING"
                :height="12"
                color="primary"
            />
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import {
    mdiCheckboxMarkedCircleOutline,
    mdiCloseCircleOutline,
    mdiCheckboxBlankCircleOutline,
} from "@mdi/js";

const { ip } = defineProps<{ ip: string }>();
const { data } = useMcsrvstatApi(ip);

enum Status {
    ONLINE,
    OFFLINE,
    PENDING,
}

const status = computed(() =>
    data.value?.online === true
        ? Status.ONLINE
        : data.value?.online === false
        ? Status.OFFLINE
        : Status.PENDING
);

const icon = computed(() => {
    switch (status.value) {
        case Status.ONLINE:
            return mdiCheckboxMarkedCircleOutline;
        case Status.OFFLINE:
            return mdiCloseCircleOutline;
        case Status.PENDING:
            return mdiCheckboxBlankCircleOutline;
    }
});

const iconColor = computed(() => {
    switch (status.value) {
        case Status.ONLINE:
            return "green";
        case Status.OFFLINE:
            return "red";
        case Status.PENDING:
            return "yellow";
    }
});
</script>

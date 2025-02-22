<template>
    <v-chip :color="color" :prepend-avatar="icon" @click="isActive = true">
        {{ name }}
    </v-chip>

    <skin-button v-model="isActive" :editable="false" :name="name" />
</template>

<script lang="ts" setup>
import javaIcon from "~/assets/java.png";
import bedrockIcon from "~/assets/bedrock.png";

const { name } = defineProps<{ name: string }>();
const isActive = ref(false);
const head = useSkinHead(() => name, 32);
const icon = computed(
    () => head.value ?? (name.startsWith("*") ? bedrockIcon : javaIcon)
);
const color = useColorHash(() => name);
</script>

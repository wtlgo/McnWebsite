<template>
    <prose-ol>
        <prose-li v-for="item in items" :key="item.id">
            <prose-a :href="`#${item.id}`">
                <prose-strong>{{ item.title }}</prose-strong>
            </prose-a>

            <table-of-contents-list
                v-if="item.children.length"
                :items="item.children"
            />
        </prose-li>
    </prose-ol>
</template>

<script lang="ts" setup>
const { items } = defineProps<{ items: TOCItem[] }>();
</script>

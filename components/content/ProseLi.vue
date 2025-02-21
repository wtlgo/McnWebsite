<style scoped>
li {
    display: list-item;
}

li:deep(span.v-list-item__underlay),
li:deep(div.v-list-item__content) {
    display: inline;
}
</style>

<template>
    <v-list-item tag="li">
        <slot />
    </v-list-item>
</template>

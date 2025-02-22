<template>
    <v-container>
        <one-row>
            <v-card>
                <content-renderer
                    class="v-card-text"
                    v-if="post"
                    :value="post"
                />
            </v-card>
        </one-row>
    </v-container>
</template>

<script lang="ts" setup>
const route = useRoute();
const slug = computed(() =>
    route.params.slug instanceof Array
        ? route.params.slug.join("/")
        : route.params.slug
);

const { data: post } = await useAsyncData(`article-${slug}`, () =>
    queryCollection("articles").path(`/article/${slug.value}`).first()
);

provideArticle(post);
</script>

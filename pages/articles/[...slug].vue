<template>
    <v-container>
        <one-row v-if="post">
            <v-card>
                <template #title>
                    <h1>{{ post.title }}</h1>
                </template>

                <v-card-text>
                    <table-of-contents />
                </v-card-text>

                <content-renderer
                    class="v-card-text"
                    :value="post"
                    :data="{ mcVersion: version }"
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

const { data: post } = await useAsyncData(`article-${slug.value}`, () =>
    queryCollection("articles").path(`/article/${slug.value}`).first()
);
provideArticle(post);

const serverStat = useMcsrvstatApi("play.mikchan.net");
const version = computed(() => serverStat.data.value?.version ?? "1.2.5");
</script>

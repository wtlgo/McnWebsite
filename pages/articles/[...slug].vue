<style lang="css" scoped>
.force-lh {
    line-height: 1 !important;
}
</style>

<template>
    <v-container>
        <scroll-to-top />

        <one-row v-if="post">
            <v-card>
                <v-img
                    height="80"
                    :color="color"
                    :src="src"
                    cover
                    gradient="rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)"
                >
                    <v-toolbar height="80" color="transparent">
                        <v-toolbar-title
                            class="force-lh text-h3 text-white"
                            :text="post.title"
                        />
                    </v-toolbar>
                </v-img>

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
const color = useColorHash(() => post.value?.title ?? "");
const src = computed(() => {
    if (!post.value) return undefined;
    if (!("img" in post.value.meta)) return undefined;
    return `${post.value.meta.img}`;
});
</script>

import type { InjectionKey } from "vue";

type Article = Awaited<
    ReturnType<ReturnType<ReturnType<typeof queryCollection>["path"]>["first"]>
> | null;

const key = Symbol() as InjectionKey<{ value: Article }>;

export const injectArticle = () => inject(key, { value: null });

export const provideArticle = (article: TValue<Article>) => {
    const art = computed(() => toValue(article));
    provide(key, art);
};

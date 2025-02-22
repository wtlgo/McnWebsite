import type { MaybeRefOrGetter } from "vue";

export type TValue<T> = MaybeRefOrGetter<T>;

export type TOCItem = { id: string; title: string; children: TOCItem[] };

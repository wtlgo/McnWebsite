import { array } from "zod";

export const filterKey =
    <T, K extends keyof T>(key: K) =>
    (arr: T[]) =>
        arr
            .map((item) => item[key])
            .filter(
                (value): value is NonNullable<T[K]> =>
                    value !== null && value !== undefined
            );

export const filterKeyArr = <T, K extends keyof T>(key: K, arr: T[]) =>
    arr
        .map((item) => item[key])
        .filter(
            (value): value is NonNullable<T[K]> =>
                value !== null && value !== undefined
        );

export const filterKeys =
    <T, K extends keyof T>(...keys: K[]) =>
    (arr: T[]) =>
        arr.filter((item) =>
            keys.every((key) => item[key] !== null && item[key] !== undefined)
        ) as Array<T & Record<K, NonNullable<T[K]>>>;

export const notNullVal = <T>(val: T): val is NonNullable<T> =>
    val !== null && val !== undefined;

export const notNullKeys =
    <T, K extends keyof T>(...keys: K[]) =>
    (val: T): val is T & Record<K, NonNullable<T[K]>> =>
        keys.every((key) => val[key] !== null && val[key] !== undefined);

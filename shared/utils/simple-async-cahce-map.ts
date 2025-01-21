import { Mutex } from "async-mutex";

export class SimpleAsyncCacheMap<K, V, C = undefined, GC = undefined> {
    private cache: Map<K, { value: V; timestamp: number }>;
    private duration: number;
    private factory: (key: K, context?: C, globalContext?: GC) => Promise<V>;
    private mutex: Map<K, Mutex>;
    private globalContext?: GC;

    constructor(
        duration: number,
        factory: (key: K, context?: C, globalContext?: GC) => Promise<V>,
        globalContext?: GC
    ) {
        this.cache = new Map();
        this.duration = duration * 1000;
        this.factory = factory;
        this.mutex = new Map();
        this.globalContext = globalContext;
    }

    async get(key: K, context?: C): Promise<V> {
        const now = Date.now();

        if (!this.mutex.has(key)) {
            this.mutex.set(key, new Mutex());
        }

        const lock = this.mutex.get(key)!;

        return lock.runExclusive(async () => {
            const refreshedCache = this.cache.get(key);

            if (
                refreshedCache &&
                now - refreshedCache.timestamp < this.duration
            ) {
                return refreshedCache.value;
            }

            const value = await this.factory(key, context, this.globalContext);
            this.cache.set(key, { value, timestamp: Date.now() });
            return value;
        });
    }

    set(key: K, value: V): void {
        const now = Date.now();
        this.cache.set(key, { value, timestamp: now });
    }

    invalidate(key: K): void {
        this.cache.delete(key);
        this.mutex.delete(key);
    }
}

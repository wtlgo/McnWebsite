type FactoryFunction<T, C = undefined> = (context?: C) => Promise<T>;

export class SimpleCache<T, C = undefined> {
    private cache: T | null = null;
    private lastFetchTime: number | null = null;
    private duration: number;
    private factory: FactoryFunction<T, C>;

    constructor(factory: FactoryFunction<T, C>, durationInSeconds: number) {
        this.factory = factory;
        this.duration = durationInSeconds * 1000;
    }

    async get(context?: C): Promise<T> {
        const now = Date.now();

        if (
            this.cache !== null &&
            this.lastFetchTime !== null &&
            now - this.lastFetchTime < this.duration
        ) {
            return this.cache;
        }

        this.cache = await this.factory(context);
        this.lastFetchTime = now;

        return this.cache;
    }
}

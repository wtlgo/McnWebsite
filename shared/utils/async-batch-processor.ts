import { Mutex } from "async-mutex";

export abstract class AsyncBatchProcessor<TInput, TOutput> {
    private queue: {
        item: TInput;
        resolve: (value: TOutput | PromiseLike<TOutput>) => void;
        reject: (reason?: any) => void;
        abortSignal?: AbortSignal;
        aborted?: boolean;
    }[] = [];
    private processing: boolean = false;
    private mutex: Mutex;

    constructor() {
        this.mutex = new Mutex();
    }

    async enqueue(item: TInput, abortSignal?: AbortSignal): Promise<TOutput> {
        return new Promise((resolve, reject) => {
            const entry = {
                item,
                resolve,
                reject,
                abortSignal,
                aborted: false,
            };

            if (abortSignal) {
                const onAbort = () => {
                    entry.aborted = true;
                    reject(new Error("Aborted"));
                };
                if (abortSignal.aborted) {
                    onAbort();
                    return;
                }
                abortSignal.addEventListener("abort", onAbort, { once: true });
            }

            this.queue.push(entry);

            if (!this.processing) {
                this.processNextBatch();
            }
        });
    }

    private async processNextBatch(): Promise<void> {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;

        const batch = this.queue.splice(0, this.queue.length);

        const allAborted = batch.every((entry) => entry.aborted);
        if (allAborted) {
            batch.forEach((entry) =>
                entry.reject(
                    new Error(
                        "Batch cancelled due to all abort signals being triggered."
                    )
                )
            );

            this.processing = false;
            this.processNextBatch();
            return;
        }

        const validEntries = batch.filter((entry) => !entry.aborted);
        const items = validEntries.map((entry) => entry.item);

        try {
            const results = await this.safeRun(items);
            results.forEach((result, index) => {
                validEntries[index].resolve(result);
            });
        } catch (error) {
            validEntries.forEach((entry) => entry.reject(error));
        } finally {
            this.processing = false;
            this.processNextBatch();
        }
    }

    private safeRun(items: TInput[]): Promise<TOutput[]> {
        return this.mutex.runExclusive(() => this.run(items));
    }

    abstract run(items: TInput[]): Promise<TOutput[]>;
}

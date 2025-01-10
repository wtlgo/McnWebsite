import { VkApi } from "~/shared/vk";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
    minTime: 333,
    maxConcurrent: 1,
});

let callbackIterator = 0;

export class VkApiJsonP extends VkApi {
    constructor(accessToken: string) {
        super(accessToken);
    }

    request(
        url: string,
        params: Record<string, any>,
        signal?: AbortSignal
    ): Promise<unknown> {
        const queryParams = new URLSearchParams();
        for (const param in params) {
            if (params[param] === null) continue;
            queryParams.append(param, params[param]);
        }

        const callbackName = `VkApiJsonPCallback${++callbackIterator}`;
        queryParams.append("callback", callbackName);

        const fullUrl = `${url}?${queryParams}`;

        return limiter.schedule(
            () =>
                new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = fullUrl;

                    if (signal) {
                        signal.onabort = () => script.remove();
                    }
                    // @ts-ignore
                    window[callbackName] = (res: unknown) => {
                        // @ts-ignore
                        delete window[callbackName];

                        script.remove();
                        resolve(res);
                    };

                    document
                        .getElementsByTagName("head")[0]
                        .appendChild(script);
                })
        );
    }
}

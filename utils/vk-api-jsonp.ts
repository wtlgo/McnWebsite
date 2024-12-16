import { VkApi } from "~/shared/vk-api";

let callbackIterator = 0;

export class VkApiJsonP extends VkApi {
    constructor(accessToken: string) {
        super(accessToken);
    }

    request(
        url: string,
        params: Record<string, any>,
        _signal?: AbortSignal
    ): Promise<unknown> {
        const queryParams = new URLSearchParams();
        for (const param in params) {
            if (params[param] === null) continue;
            queryParams.append(param, params[param]);
        }

        const callbackName = `VkApiJsonPCallback${++callbackIterator}`;
        queryParams.append("callback", callbackName);

        const fullUrl = `${url}?${queryParams}`;

        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = fullUrl;

            // @ts-ignore
            window[callbackName] = (res: unknown) => {
                // @ts-ignore
                delete window[callbackName];

                script.remove();
                resolve(res);
            };

            document.getElementsByTagName("head")[0].appendChild(script);
        });
    }
}

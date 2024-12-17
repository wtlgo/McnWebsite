import { VkApi } from "~/shared/vk";

export class VkApiFetch extends VkApi {
    constructor(accessToken: string) {
        super(accessToken);
    }

    request(
        url: string,
        params: Record<string, any>,
        signal?: AbortSignal
    ): Promise<unknown> {
        return $fetch(url, { params, signal });
    }
}

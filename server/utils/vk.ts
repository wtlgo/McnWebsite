import { VkApi } from "~/shared/vk-api";

export const ServiceVkAPI: VkApi = new VkApiFetch(
    useRuntimeConfig().vkApiServiceKey
);

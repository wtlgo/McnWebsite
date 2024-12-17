import { VkApi } from "~/shared/vk";

export const ServiceVkAPI: VkApi = new VkApiFetch(
    useRuntimeConfig().vkApiServiceKey
);

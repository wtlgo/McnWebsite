import { z } from "zod";
import {
    authResponseSchema,
    groupsResponseSchema,
    userResponseSchema,
    type GroupsGetByIdParams,
    type UserGetParams,
} from "./types";

export abstract class VkApi {
    private readonly accessToken: string;
    private readonly version = "5.236";

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    abstract request(
        url: string,
        params: Record<string, any>,
        signal?: AbortSignal
    ): Promise<unknown>;

    private async doRequest<TSchema extends z.ZodTypeAny>(
        schema: TSchema,
        url: string,
        params: Record<string, any>,
        signal?: AbortSignal
    ): Promise<z.infer<TSchema>> {
        const res = await this.request(url, params, signal);
        return schema.parseAsync(res);
    }

    async userGet({ userIds }: UserGetParams, signal?: AbortSignal) {
        return this.doRequest(
            userResponseSchema,
            "https://api.vk.com/method/users.get",
            {
                user_ids: userIds?.join(","),
                fields: "photo_400",
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );
    }

    async groupsGetById(
        { groupIds, fields }: GroupsGetByIdParams,
        signal?: AbortSignal
    ) {
        return this.doRequest(
            groupsResponseSchema,
            "https://api.vk.com/method/groups.getById",
            {
                group_ids: groupIds?.join(","),
                fields: fields?.join(","),
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );
    }

    async authExchangeSilentAuthToken(
        token: string,
        uuid: string,
        signal?: AbortSignal
    ) {
        return this.doRequest(
            authResponseSchema,
            "https://api.vk.com/method/auth.exchangeSilentAuthToken",
            {
                token,
                uuid,
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );
    }
}

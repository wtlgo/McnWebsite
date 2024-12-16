import { z } from "zod";

export interface GroupsGetByIdParams {
    groupIds?: (number | string)[];
    fields?: "cover"[];
    signal?: AbortSignal;
}

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

    private static readonly userResponseSchema = z
        .object({
            response: z.array(
                z.object({
                    id: z.coerce.number(),
                    first_name: z.coerce.string(),
                    last_name: z.coerce.string(),
                    photo_400: z.coerce.string().optional(),
                })
            ),
        })
        .transform((res) => res.response);

    async userGet(userIds?: number[], signal?: AbortSignal) {
        const res = await this.request(
            "https://api.vk.com/method/users.get",
            {
                user_ids: userIds?.join(","),
                fields: "photo_400",
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );

        return await VkApi.userResponseSchema.parseAsync(res);
    }

    private static readonly groupsResponseSchema = z
        .object({
            response: z.object({
                groups: z.array(
                    z.object({
                        id: z.coerce.number(),
                        is_admin: z.coerce.boolean(),
                        is_member: z.coerce.boolean(),
                        cover: z
                            .object({
                                enabled: z.coerce.boolean(),
                                images: z.array(
                                    z.object({
                                        url: z.coerce.string(),
                                        width: z.coerce.number(),
                                        height: z.coerce.number(),
                                    })
                                ),
                            })
                            .optional(),
                    })
                ),
            }),
        })
        .transform((res) => res.response.groups);

    async groupsGetById({ groupIds, fields, signal }: GroupsGetByIdParams) {
        const res = await this.request(
            "https://api.vk.com/method/groups.getById",
            {
                group_ids: groupIds?.join(","),
                fields: fields?.join(","),
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );

        return await VkApi.groupsResponseSchema.parseAsync(res);
    }

    private static readonly authResponseSchema = z
        .object({
            response: z.object({
                access_token: z.string(),
                expires_in: z.coerce.number(),
                user_id: z.coerce.number(),
            }),
        })
        .transform((res) => res.response);

    async authExchangeSilentAuthToken(
        token: string,
        uuid: string,
        signal?: AbortSignal
    ) {
        const res = await this.request(
            "https://api.vk.com/method/auth.exchangeSilentAuthToken",
            {
                token,
                uuid,
                v: this.version,
                access_token: this.accessToken,
            },
            signal
        );

        return await VkApi.authResponseSchema.parseAsync(res);
    }
}

import { H3Event } from "h3";
import { z } from "zod";

export const getZodQuery = <
    TSchema extends z.ZodTypeAny,
    Event extends H3Event = H3Event
>(
    event: Event,
    schema: TSchema
): z.infer<TSchema> => {
    const query = getQuery(event);
    const result = schema.safeParse(query);
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message:
                "Ошибка валидации запроса:\n" +
                result.error.issues
                    .map((issue, idx) => `${idx + 1}. ${issue.message}`)
                    .join("\n"),
        });
    }

    return result.data;
};

import { H3Event } from "h3";
import { z } from "zod";

export const readValidatedZodBody = async <
    Event extends H3Event,
    TSchema extends z.ZodTypeAny
>(
    event: Event,
    schema: TSchema
): Promise<z.infer<TSchema>> => {
    const result = await readValidatedBody(event, (body) =>
        schema.safeParse(body)
    );

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message:
                "Ошибка валидации данных:\n" +
                result.error.issues
                    .map((issue, idx) => `${idx + 1}. ${issue.message}`)
                    .join("\n"),
        });
    }

    return result.data;
};

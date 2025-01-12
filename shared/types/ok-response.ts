import { z } from "zod";

export const okResponseSchema = z.literal("OK");

export type OkResponse = z.infer<typeof okResponseSchema>;

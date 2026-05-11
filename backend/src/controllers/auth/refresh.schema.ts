import { z } from "zod";

export const refreshSchema = {
    body: z.object({
        refreshToken: z.string(),
    }),
};
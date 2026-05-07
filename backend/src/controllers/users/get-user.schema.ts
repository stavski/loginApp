import { z } from "zod";

export const getUserSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),
};
import { z } from "zod";

export const getSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),
};
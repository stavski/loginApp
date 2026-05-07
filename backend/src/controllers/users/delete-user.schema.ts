import { z } from "zod";

export const deleteUserSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),
};
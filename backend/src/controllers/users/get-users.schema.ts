import { z } from "zod";

export const getUsersSchema = {
    params: z.object({
        id: z.coerce.number().min(1),
    }),
};
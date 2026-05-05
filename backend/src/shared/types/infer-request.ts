import { Request } from "express";
import { z } from "zod";

export type InferRequest<T extends {
    body?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
}> = Request<
    T extends { params: z.ZodTypeAny } ? z.infer<T["params"]> : any,
    any,
    T extends { body: z.ZodTypeAny } ? z.infer<T["body"]> : any,
    T extends { query: z.ZodTypeAny } ? z.infer<T["query"]> : any
>;
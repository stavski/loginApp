import { RequestHandler } from "express";
import { ZodError, ZodType } from "zod";

type TProperty = 'body' | 'headers' | 'params' | 'query';

type TSchema = Partial<Record<TProperty, ZodType<unknown>>>;

export const validation = (schemas: TSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            Object.entries(schemas).forEach(([key, schema]) => {
                const property = key as TProperty;
                if (!schema) return;

                const result = schema.safeParse(req[property]);

                if (!result.success) {
                    throw result.error;
                }

                req.validated = {
                    ...req.validated,
                    [property]: result.data,
                };
            });

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors: Record<string, string> = {};

                error.issues.forEach(issue => {
                    const field = issue.path.join('.') || 'root';
                    if (!formattedErrors[field]) {
                        formattedErrors[field] = issue.message;
                    }
                });

                return res.status(400).json({
                    errors: formattedErrors,
                });
            }

            return res.status(500).json({
                error: "Internal server error",
            });
        }
    };
};
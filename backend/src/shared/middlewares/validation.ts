import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodType } from "zod";

type TSchema = {
    body?: ZodType<any>;
    params?: ZodType<any>;
    query?: ZodType<any>;
    headers?: ZodType<any>;
};

export const validation = (schemas: TSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }

            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }

            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }

            if (schemas.headers) {
                req.headers = schemas.headers.parse(req.headers);
            }

            return next();
            
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: error.issues,
                });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal error",
            });
        }
    };
};
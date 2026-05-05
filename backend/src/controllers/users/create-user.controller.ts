import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InferRequest } from "../../shared/types/infer-request";

import { createUserSchema } from "./create-user.schema";

type Req = InferRequest<typeof createUserSchema>;

export const createUser = async (req: Req, res: Response) => {
    const body = req.body;

    return res.status(StatusCodes.CREATED).json({
        message: "User created",
        data: body,
    });
};
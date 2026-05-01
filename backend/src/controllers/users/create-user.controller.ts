import { Request, Response } from "express";
import { CreateUserBody } from "./user.schema";
import { StatusCodes } from "http-status-codes";

export const create = async (req: Request, res: Response) => {
    const user = req.body as CreateUserBody;

    return res.status(StatusCodes.CREATED).json({
        message: "User created",
        data: user,
    });
};
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const create = async (req: Request, res: Response) => {
    const body = req.body;

    return res.status(StatusCodes.CREATED).json({
        message: "User created",
        data: {
            body,
        },
    });
};
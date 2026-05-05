import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const getById = async (req: Request, res: Response) => {
    const params = req.params;

    return res.status(StatusCodes.OK).json({
        message: "Get user by id",
        data: params,
    });
};
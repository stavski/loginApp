import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
    const query = (req as any).validated.query;

    return res.status(StatusCodes.OK).json({
        message: "Get all users",
        data: query,
    });
};
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const update = async (req: Request, res: Response) => {
    const body = req.body;
    const params = req.params;

    return res.status(StatusCodes.OK).json({
        message: "User updated",
        data: {
            body,
            params,
        },
    });
};
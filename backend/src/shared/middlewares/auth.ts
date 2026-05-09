import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: number;
}

export const auth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            error: "Token not provided",
        });
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        req.userId = Number(decoded.sub);

        return next();

    } catch {
        return res.status(401).json({
            error: "Invalid token",
        });
    }
};
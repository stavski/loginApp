import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const refresh = async (
    req: Request,
    res: Response
) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            error: "Refresh token not provided",
        });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as jwt.JwtPayload;

        const accessToken = jwt.sign(
            {
                sub: decoded.sub,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "15m",
            }
        );

        return res.status(200).json({
            accessToken,
        });

    } catch {
        return res.status(401).json({
            error: "Invalid refresh token",
        });
    }
};
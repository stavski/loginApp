import { Request, Response } from "express";

interface IUser {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const create = (req: Request<{}, {}, IUser>, res: Response) => {
    console.log(req.body);

    return res.send("Create!");
};
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("API runing!");
});

router.post("/login", (req, res) => {

    res.json(req.body);
});

export { router };
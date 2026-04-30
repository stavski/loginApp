import express from "express";
import "dotenv/config";

import { router } from "./routes";


const server = express();

server.use(express.json());

server.use(router);

server.listen(process.env.PORT || 3333, () => {
    console.log(`Server running on port ${process.env.PORT || 3333}`);
});

export { server };
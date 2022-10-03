import express from "express";
import cors from "cors";
import morgan from "morgan";
import Routers from "./routers.js";

class Server {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routers();
    }


    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(morgan("dev"));
        this.express.use(express.static("public"));
    }

    routers() {
        this.express.use(Routers);
    }
}

export default Server;
import 'express-async-errors';
import 'dotenv/config'
import { application } from "express";
import Server from "./server.js";



const server = new Server().express;

server.listen(3000, console.log("Acesse: http://localhost:3000"));


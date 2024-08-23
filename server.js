import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
//import { connectUsingMongoose } from './backend/db.config.js';
import { connectUsingMongoose } from "./backend/db.config.js";
import userRoutes from "./backend/features/users/user.routes.js";
import habitRoutes from "./backend/features/habits/habit.routes.js";
import todayRoutes from "./backend/features/todayhabit/today.routes.js";

const server =express();

server.use(cors({
    exposedHeaders:['userId']
}));
server.use(bodyParser.json());

server.use('/api',userRoutes);
server.use('/habit',habitRoutes);
server.use('/todayhabit',todayRoutes);
//server.use('/todayhabit');

server.listen('3000',()=>{
    console.log("Server is listening to port 3000");
    connectUsingMongoose();
});
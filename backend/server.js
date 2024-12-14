import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import {dbConnection} from './config/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { initializeSocket } from "./socket/socketServer.js";



dotenv.config(); 


const app=express();
const httpServer=createServer(app);
const port=process.env.PORT ;

initializeSocket(httpServer);

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',  
    credentials: true,                
  };
  
  app.use(cors(corsOptions));





app.use("/api/auth", authRoutes);
app.use("/api/user" ,userRoutes);
app.use("/api/matches",matchesRoutes);
app.use("/api/messages",messagesRoutes);


app.use(errorHandler);

httpServer.listen(port,()=>{
    console.log(`Server running on ${port}`);
    dbConnection();
});

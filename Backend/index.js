import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";

import UserRoute from './routes/auth.routes.js';
import adminRoutes from "./routes/admin.routes.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

app.use("/api/auth", UserRoute);
app.use("/api/admin", adminRoutes);


mongoose.set("strictQuery",true);

// start the server 
mongoose.connect(CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=>{
        console.log(`server running on PORT: ${PORT}`)
    }))
    .catch((error)=> console.log(error.message));
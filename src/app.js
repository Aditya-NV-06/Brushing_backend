import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const application= express();

application.use(cors());


application.use(express.json({limit: '50kb'}));
application.use(express.urlencoded({extended: true}));
application.use(cookieParser());

import userRouter from './routes/user.route.js';       


application.use("/api/v1/users",userRouter);



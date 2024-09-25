import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const application= express();

application.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));


application.use(express.json({limit: '50kb'}));

application.use(cookieParser());
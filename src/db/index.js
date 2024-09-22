import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_NAME} from "../constants.js";
import { application } from "express";
dotenv.config({path: '.env'});


const connect = async () => {
     try{ 
        await mongoose.connect(process.env.MONGO_URL+ `${DB_NAME}`)
        console.log("Database connected successfully")


        application.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
     }
     catch(err){ 
            console.log(err)
            process.exit(1)
     }


}


export default connect;
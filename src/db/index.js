import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_NAME} from "../constants.js";
dotenv.config({path: '.env'});


const connect = async () => {
     try{ 
        await mongoose.connect(process.env.MONGO_URL+ `${DB_NAME}`)
        console.log("Database connected successfully")
        }
     catch(err){ 
            console.log(err)
            process.exit(1)
     }


}


export default connect;
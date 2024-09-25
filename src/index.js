
import { application } from "express";
import connect from "./db/index.js";




connect()
.then(() => {
   application.listen(process.env.PORT,()=>{                
    console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {    
    console.log(err)
    process.exit(1)
})
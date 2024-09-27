import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env' });    

cloudinary.config({ 
    cloud_name:process.env.CLOUNDINARY_NAME, 
    api_key:process.env.CLOUNDINARY_API_KEY, 
    api_secret: process.env.CLOUNDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});



const upload = async (file) => {    
    try {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
    } catch (error) {               
        
        fs.unlinkSync(file.path);                          
        console.log(error);
    }
}


export default upload;
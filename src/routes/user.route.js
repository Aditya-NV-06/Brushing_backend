import {Router} from 'express';
import register from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middle.js';
const router = Router();


router.route('/').post(
   upload.fields({
    name:avatar,
    maxCount:1
   },
   {        
        name:cover, 
        maxCount:1
    }),
    register
);








export default router;
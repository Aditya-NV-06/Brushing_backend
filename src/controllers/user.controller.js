import {asyncHandler} from '../utils/asynchandler.js';

 
const register = asyncHandler(async (err,req, res, next) => {
  res.status(200).json({ 
    message:'ok',
  })  
 
})




export default register
import {asyncHandler} from '../utils/asynchandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';
import {upload} from '../utils/fileupload.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const register = asyncHandler(async (err,req, res, next) => {
  //get all fields from the request body
 const {fullname,email,password,avatar,cover} = req.body;

 //check if all fields are filled
  if(!fullname || !email || !password || !avatar || !cover){
    throw  new ApiError(400,'Please fill all fields'); 
  }

  //check if the email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if(!emailRegex.test(email)){
    throw  new ApiError(400,'Please enter a valid email');
  }

  //check if the password is valid
  if(password.length < 6){
    throw  new ApiError(400,'Password must be at least 6 characters');
  }

  //check if the user already exists
  const user = await User.findeOne({
    $or : [{email},{username}]
  })
  

  if(user){ 
    throw new ApiError(400,'User already exists');
  }

  const pathlocal=req.files?.avatar[0].path;

  console.log(pathlocal);

  const coverimage=req.files?.cover[0].path;


  if(!pathlocal){ 
    throw new ApiError (400,'Please upload on the avatar image')
  }
  

  const avatarcontent  = await upload(pathlocal)
  const covercontent = await upload(coverimage)

  if(!avatarcontent || !covercontent){
    throw new ApiError(500,'Error uploading image');
  }

  const newUser =  User.create({
    fullname,
    email,
    password,
    avatar:avatarcontent,
    cover:covercontent,
    username:username.toLowerCase()
  })

  const createdUser = await User.findById(newUser._id).select('-password -refreshTokens');

 if (!createdUser){ 
    throw new ApiError(500,'Error creating user');
 }
  
  return res.status(201).json(
    new ApiResponse(201,createdUser,"User created successfully")
  )

})




export default register
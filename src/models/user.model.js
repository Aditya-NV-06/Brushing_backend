import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const  { Schema,model} = mongoose();

const userSchema = new Schema({
    username:{ 
        type:String,
        required:true,
        unquiue:true,
        lowercase:true,
        trim:true
    },
    email:{ 
        type:String,
        required:true,
        unquiue:true,
    },
    fullname:{ 
        type:String,
        required:true,
    },
    password:{ 
        type:String,
        required:true,
    },
    createdAt:{ 
        type:Date,
        default:Date.now
    },
    updatedAt:{ 
        type:Date,
        default:Date.now
    },
    avatar:{ 
        type:String,
        default:null
    },
    coverImage:{ 
        type:String,
        default:null
    },
    watch_history:{ 
        type:Types.ObjectId,
        ref:"Video"
    },
    refreshTokens:{
            type:String,
            required:true
    },
},{timestamps:true});



userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        next();
    }
    this.password=bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect= 
async  function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken=
function (){ 
    return jwt.sign(
        {_id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1h'}
    )
}

userSchema.methods.generateRefreshToken=
function (){ 
    return jwt.sign(
        {
            _id:this._id,
        }
        ,process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    )
}
const User= model('User',userSchema);


export default User;
import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const { Schema, model } = mongoose;


const videoSchema=new Schema({ 
    videoFile:{ 
        type:String,
        required:true,
    },
    thumbnail:{ 
        type:String,
        required:true,
    },
    title:{ 
        type:String,
        required:true,
    },
    description:{ 
        type:String,
        required:true,
    },
    duration:{ 
        type:Number,
        required:true,
    },
    views:{ 
        type:Number,
        default:0
    },
    owner:{
        type:Types.ObjectId,
        ref:"User"
    },
    isPublished:{ 
        type:Boolean,
        default:true
    }
},{timestamps:true});



videoSchema.plugin(mongooseAggregatePaginate);



const video =model('Video',videoSchema);

export default video;
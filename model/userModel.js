import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema=new schema({
    Firstname:{
        type:String,
        required:true
        
    },
    Lastname:{
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:['admin', 'user'],
            message:'Role must be admin or user.'
        },
        default:'user'
    },
    otp:{
        type:Number,
        required:true
    },
    otpExpires:{
        type:Date,
        required:false
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
})

const UserModel=mongoose.model("User",userSchema);

export default UserModel;
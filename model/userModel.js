import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema=new schema({
    name:{
        type:String,
        required:true,
        unique:true
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
    profilePicture:{
        type:String,
        required:false
    },
    bookingHistory: { type: [String] },
    ContactInformation:{
        type:String,
        required:false
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
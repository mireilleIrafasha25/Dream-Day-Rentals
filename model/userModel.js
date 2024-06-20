import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema=new schema({
    Firstname:{
        type:String,
        required:false,
        message:["Please enter your first name"]
        
    },
    Lastname:{
        type:String,
        required:false
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
    confirmPassword:{
        type:String,
        required:false
    },
    role:{
        
        enum:{
            values:["admin", "user"],
            message:'Role must be admin or user.'
        },
        type:String,
        default: "user"
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
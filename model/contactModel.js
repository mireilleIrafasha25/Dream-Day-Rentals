import mongoose from "mongoose";
const schema=mongoose.Schema;

const contactSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

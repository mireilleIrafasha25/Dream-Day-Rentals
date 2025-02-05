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
    message1:{
        type:String,
        required:true,
    }
});
const ContactModel=mongoose.model("Contact",contactSchema);

export default ContactModel;

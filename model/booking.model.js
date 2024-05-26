
import mongoose from "mongoose";
const schema= mongoose.Schema
const bookingSchema = new schema({
    
    Fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
    type:String,
    required: true,
    },
   category:{
        type: String,
        required: true,
        enum: {
            values: ["Hall","Garden", "Decoration","Invitation","Photography"],
            message: "{values} is not a valid service category",
        },
    },
    serviceName: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"service",
        required: true,
    },
   
    date: {
        type:String,
        require: true,
    },

    paymentMethod: {
        type: String,
        required: false,
        enum:{
            values:["Mobile Money","Credit Card","Debit Card"],
            message:"{values} is not a valid payment method"
        }
    }


});
 
const booking =mongoose.model('booking', bookingSchema)
export default booking;
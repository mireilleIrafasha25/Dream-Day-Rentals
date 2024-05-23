import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
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
        type: String,
        require: true,
    },
   
    date: {
        type: String,
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
 
const booking =model('booking', bookingSchema)
export default booking;
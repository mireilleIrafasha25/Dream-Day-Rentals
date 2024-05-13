import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
       
    },
    serviceName: {
        type: String,
        require: true,
        enum: {
            values: ["Hall","Decoration","Invitation","Photography"],
            message:"{values} is not a valid service name"
        },
        default: "Hall"
    },
    capacity: {
       type: Number,
       require: true
    },
    duration: {
        type: String,
        require: true,
        enum: {
            values: ["Part-time", "Full-time"],
            message:"{values} is not a valid duration"
        }
    },
    paymentMethod: {
        type: String,
        required: false
    }


});
 
const booking =model('booking', bookingSchema)
export default booking;


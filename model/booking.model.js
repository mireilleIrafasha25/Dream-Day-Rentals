import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
       
    },
    category:{
        type: String,
        required: true,
        enum: {
            values: ["Hall","Tent", "Decoration","Invitation","Photography"],
            message: "{values} is not a valid service category",
        },
    },
    serviceName: {
        type: String,
        require: true,
    },
    capacity: {
       type: Number,
       require: false
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


},
{
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    timestamps: true,
});
 
const booking =model('booking', bookingSchema)
export default booking;


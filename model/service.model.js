import {model, Schema} from "mongoose";

const serviceSchema = new Schema (
    
    {
    serviceName:{
        type: String,
        required: true,
         unique: true
         },

    description: {
        type: String,
        required: false
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: ["Hall", "Tent", "Decoration","Invitation","Photography"],
            message: "{values} is not a valid service category",
        }
    },
    
    location:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: Number,
        require: false
    },
    servicePrice: {
        type: Number,
        require: true
    },
    availability:{
         type: Boolean,
         require: true
    },
    
}
);

const service = model('service', serviceSchema);
export default service;
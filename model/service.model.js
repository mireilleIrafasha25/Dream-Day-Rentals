import {model, Schema} from "mongoose";

const serviceSchema = new Schema (
    
    {
    serviceName:{
        type: String,
        required: true,
        enum: {
            values: ["Hall","Decoration","Invitation","Photography"],
            message:"{values} is not a valid service name"
        }
         },

    description: {
        type: String,
        required: false
    },
    
    location:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: Number,
        require: true
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
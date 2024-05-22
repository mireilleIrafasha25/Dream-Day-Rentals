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
            values: ["Hall", "Garden", "Decoration","Invitation","Photography"],
            message: "{values} is not a valid service category",
        }
    },

    Profile:{
        url:{
            type:String
        }
    },
    
    location:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true
       
    },
    phoneNumber:{
        type: Number,
        require: true
    },
    Price: {
        type: Number,
        require: true
    },
    

    availability:{
         type: Boolean,
         require: true
    }
   
    
}
);

const service = model('service', serviceSchema);
export default service;
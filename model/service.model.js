import mongoose from "mongoose";
const schema=mongoose.Schema
const serviceSchema = new schema({
    serviceName: {
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
            values: ["Hall", "Garden", "Decoration", "Invitation", "Photography"],
            message: "{VALUE} is not a valid service category",
        }
    },
    image: {
        url: {
            type: String
        }
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    availability: {
        type: Boolean,
        required: true
    },
    more: {
        type: String,
        required: false
    }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;

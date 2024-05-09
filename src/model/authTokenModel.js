import mongoose, {model,Schema} from 'mongoose';
const TokenSchema= new Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    expirationDate:
    {
        type:Date,
        required:true,
    }

});
const Token=model("Token",TokenSchema);
export default Token;
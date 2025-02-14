import UserModel from "../model/userModel.js";
import asyncWrapper from "../middleware/async.js";
import { otpGenerator } from "../utils/otp.js";
import {UnauthorizedError} from '../error/Unauthorized.js'
import {BadRequestError,NotFoundError} from "../error/index.js";
import {validationResult} from 'express-validator';
import {sendEmail} from '../utils/sendEmail.js';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import Token from "../model/authTokenModel.js";
import dotenv from "dotenv"
dotenv.config();
export const test = (req, res, next) => {
    res.status(200).json({message:'Hello Brides!'});
}

export const SignUp=asyncWrapper(async(req,res,next)=>
{
// validation
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
         next(new BadRequestError(errors.array()[0].msg))
    }
    //checking if password match
    if(req.body.password !== req.body.confirmPassword)
        {
            return next(new BadRequestError("Passwords do not match"));
        }
    // checking  if user is already in using the email
    const FounderUser=await UserModel.findOne({email:req.body.email})
    if(FounderUser)
    {
        return next(new BadRequestError("Email is already in using this email"))
    };

    //harshing the user Password
    const hashedPassword = await bcryptjs.hashSync(req.body.password,10);
    //Generating otp generator
    const otp=otpGenerator();
    const otpExpirationDate= new Date().getTime()+(60*1000*5);
    //Recording the user to the database
    const newUser= new UserModel({
        Firstname:req.body.Firstname,
        Lastname:req.body.Lastname,
        email:req.body.email,
        password:hashedPassword,
        role:req.body.role,
        otp: otp,
        otpExpires:otpExpirationDate
    });
    if (!req.body.email) {
        return res.status(400).send('Email is required');
      }
      
    const savedUser= await newUser.save();
    // console.log(savedUser);
 await sendEmail(req.body.email,"Verify your account",`Your OTP is ${otp}`)
 if(savedUser)
 {
    return res.status(201).json({
        message:"User account created!",
        user:savedUser
    })
 }
});
export const Validateopt=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=  validationResult(req);
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    // checking if given opt is stored in our database
    const FounderUser=await UserModel.findOne({otp:req.body.otp})
    if(!FounderUser)
    {
        next(new UnauthorizedError('Authorization denied'));
    };
    // checking if otp is expired or not
    if(FounderUser.otp.expires < new Date().getTime())
    {
        next(new UnauthorizedError('OTP expired'));
    }
    // Update the user to 
    FounderUser.verified = true;
    const savedUser = await FounderUser.save();
    if(savedUser)
    {
        return res.status(200).json({
            message:"User account verified!",
            user:savedUser
        })
    }

});
export const SignIn=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        return next(new BadRequestError('Invalid Email or password'))

    };
    //check account verification
     if(FoundUser.verified==false)
     {
         return next(new BadRequestError('Account is not verified'))
    }
    //Verify password
    const isPasswordVerified= await bcryptjs.compareSync(req.body.password,FoundUser.password)
    if(!isPasswordVerified)
    {
        return next(new BadRequestError('Invalid Password'))
    }
    //Generate token
    const token = jwt.sign({id:FoundUser.id,email:FoundUser.email,Firstname:FoundUser.Firstname,Lastname:FoundUser.Lastname,role: FoundUser.role },process.env.JWT_SECRET_KEY, {expiresIn:'1h'});

    res.status(200).json({
        message:"Login successful",
        user:FoundUser,
        token:token
    });
});
 
export const getAllusers =  async (req, res, next) => {
    try{
        const getUsers = await UserModel.find();
        if(getUsers){
            return res.status(200).json({
                size: getUsers.length,
                getUsers
            })
        }
        
    }catch (error){
        next(error);  
    }}

export const Logout=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }

  
 // Assuming you have a field in your user model to store the token
  // For example, let's assume it's called 'token'
  
  //Clear the token from the database
  UserModel.token = null; // or any mechanism to invalidate the token
  await UserModel.save(); // Save the updated user to the database
//   Token.token = null; // or any mechanism to invalidate the token
//   await Token.save(); // Save the updated user to the database

  res.status(200).json({ message: 'Logout successful' });  
})

export const ForgotPassword=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return next(new BadRequestError(errors.array()[0].msg))
    }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        return next(new BadRequestError('Invalid Email or password'))
    }
    //Generate token
    const token=jwt.sign({id:FoundUser.id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
    //Recording the token to the database
    await Token.create({
        token:token,
        user:FoundUser._id,
        expirationDate:new Date().getTime()+ (60*1000*5),
    });
    const link=`https://localhost:8080/reset-password?token=${token}&id=${FoundUser.id}`;
    const emailBody=`click on the link below  to reset your password \n\n${link}`;
    await sendEmail(req.body.email,"Reset your password",emailBody);

    res.status(200).json({
        message:"we sent you a reset password link on yourn email"
    });
});

export const ResetPassword = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };
    //checking if password match
    if(req.body.password !== req.body.confirmPassword)
        {
            return next(new BadRequestError("Passwords do not match"));
        }
    // Verify token
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        return next(new BadRequestError("Invalid token!"));
    }
    const recordedToken = await Token.findOne({ token: req.body.token });
    if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
        return next(new BadRequestError("Invalid token!"));
    }
    if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
        return next(new BadRequestError("Token expired!"));
    }
    // Find user
    const foundUser = await UserModel.findById(req.body.id);
    if (!foundUser) {
        return next(new BadRequestError("User not found!"));
    };
    // Deleting the user token
    await Token.deleteOne({ token: req.body.token });
    // Harshing the user password
    const inputedPassword = await bcryptjs.hashSync(req.body.password, 10);
    // Updating the user password
    foundUser.password = inputedPassword;
    const savedUser = await foundUser.save();
    if (savedUser) {
        return res.status(200).json({
            message: "Your password has been reset!",
        })
    }
   });
   export const updateUser = asyncWrapper(async (req, res, next) => {
    // Extract email and updated data from the request body
    const { email } = req.body;
    const updatedData = req.body;
  
    try {
      // Find the user by email and update with new data
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },                // Search for a user with this email
        updatedData,              // Update the user with this new data
        { new: true, runValidators: true } // Return the updated user and run validators
      );
  
      // If no user is found with the given email, return a 404 error
      if (!updatedUser) {
        return next(new NotFoundError('User with this email not found'));
      }
  
      // Respond with the updated user data
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
      });
    } catch (error) {
      // Handle any unexpected errors
      next(error);
    }
  });
  
export const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
        return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
        message: "User deleted successfully"
    });
});
export const findUserByName = asyncWrapper(async (req, res, next) => {
    const { name } = req.query;

    const users = await UserModel.find({
        $or: [
            { Firstname: { $regex: name, $options: "i" } },  // Case-insensitive search
            { Lastname: { $regex: name, $options: "i" } }
        ]
    });

    if (!users.length) {
        return next(new NotFoundError('No user found with that name'));
    }

    res.status(200).json({
        size: users.length,
        users
    });
});




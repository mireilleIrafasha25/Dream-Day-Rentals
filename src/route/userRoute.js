
import {SignIn,SignUp,ResetPassword,ForgotPassword,Validateopt} from '../Controller/Usercontroller.js';
import express from 'express';
import { signUpValidation,signInValidation,otpValidation,resetPasswordValidation,forgotpasswordValidation, } from '../utils/validation.js';
const route= express.Router();
route.post('/signup',signUpValidation,SignUp)
route.post('/signin',signInValidation,SignIn)
route.post('/resetpassword',resetPasswordValidation,ResetPassword)
route.post('/forgotpassword',forgotpasswordValidation,ForgotPassword)
route.post('/verify',otpValidation,Validateopt)

export default route;
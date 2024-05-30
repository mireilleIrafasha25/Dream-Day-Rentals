import {body} from 'express-validator';

export const forgotpasswordValidation=[
    body("email","Email is required").not().isEmpty(),
];

export const resetPasswordValidation=[

    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    body("confirmPassword","confirmPassword is required ").not().isEmpty()
];
export const otpValidation=[

    body("otp","otp is required").not().isEmpty()
];

export const signUpValidation=[
    body("Firstname","Firstname is required").not().isEmpty(),
    body("Lastname","Lastname is required").not().isEmpty(),
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    body("confirmPassword","confirmpassword is required ").not().isEmpty(),
  //  body("confirmpassword","confirmPassword  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
];

export const signInValidation=[
    
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Invalid password").isStrongPassword()
];

export const testValidation = [
    body("serviceName","the name of the service is required").not().isEmpty()
   
];

export const addServiceValidation = [
    body("serviceName", "Service name is required").not().isEmpty(),
    body("category", "Service category name is required").not().isEmpty(),
    body("price", "Price of the service is required").not().isEmpty(),
    body("availability", "availability of a service is required").not().isEmpty()
];

export const addNewBookingValidation = [
    body("Fullname","Your name  required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("serviceName", "Service name is required").not().isEmpty(),
    body("paymentMethod", "Payment method is required").not().isEmpty()
];

export const addnewMessageValidation = [
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("message", "message is required").not().isEmpty()
]

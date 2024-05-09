import {body} from 'express-validator';
export const forgotpasswordValidation=[
    body("email","Email is required").not().isEmpty(),
]

export const resetPasswordValidation=[

    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword()
];
export const otpValidation=[

    body("otp","otp is required").not().isEmpty()
]

export const signUpValidation=[
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword()
]

export const signInValidation=[
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Invalid password").isStrongPassword()
]
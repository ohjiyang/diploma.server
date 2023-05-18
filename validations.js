import {body} from "express-validator";

export const registrationValidation = [
    body('username').isLength({min: 6}),
    body('full_name').isLength({min: 2}),
    body('password').isLength({min: 6}),
]

export const loginValidation = [
    body('username').isLength({min: 6}),
    body('password').isLength({min: 8}),
]
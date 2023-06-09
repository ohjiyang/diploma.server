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

export const projectCreateValidation = [
    body('title').isLength({min: 5}),
]

export const projectUpdateTitleValidation = [
    body('title').isLength({min: 5}),
]

export const descriptionCreateValidation = [
    body('title').isLength({min: 5}),
]

export const descriptionUpdateValidation = [
    body('title').isLength({min: 5}),
]

export const taskCreateValidation = [
    body('title').isLength({min: 5}),
]

export const statusCreateValidation = [
    body('title').isLength({min: 5}),
]
export const commentCreateValidation = [
    body('title').isLength({min: 5}),
]
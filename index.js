import express from "express"
import cors from "cors"
import mongoose from "mongoose";
//validations
import {
    registrationValidation,
    loginValidation,
} from "./validations.js";
//controllers
import * as UserController from "./controllers/UserController.js"

mongoose
    .connect('mongodb+srv://nothinnnew:Fkon0071223@cluster0.tr3ppkm.mongodb.net/somenote?retryWrites=true&w=majority')
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB error", err))

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello world")
})

//User
app.post("/auth/registration", registrationValidation, UserController.registration)
app.post("/auth/login", loginValidation, UserController.login)
app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server OK")
})
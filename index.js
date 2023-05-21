import express from "express"
import cors from "cors"
import mongoose from "mongoose";
//utils
import CheckAuth from "./utils/CheckAuth.js";
//validations
import {
    registrationValidation,
    loginValidation,
    projectCreateValidation,
    projectUpdateTitleValidation,
} from "./validations.js";
//controllers
import * as UserController from "./controllers/UserController.js"
import * as ProjectController from "./controllers/ProjectController.js"

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
//Project
app.post("/projects/", CheckAuth, projectCreateValidation, ProjectController.create)
app.get("/projects/", CheckAuth, ProjectController.getAll)
app.get("/projects/:id", CheckAuth, ProjectController.getOne)
app.patch("/projects/:id", CheckAuth, projectUpdateTitleValidation, ProjectController.updateTitle)
app.patch("/projects/add_user/:id", CheckAuth, ProjectController.updateUser)
app.delete("/projects/:id", CheckAuth, ProjectController.remove)
app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server OK")
})
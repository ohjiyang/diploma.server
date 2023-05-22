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
    descriptionCreateValidation,
    descriptionUpdateValidation,
    taskCreateValidation,
    statusCreateValidation,
    commentCreateValidation
} from "./validations.js";
//controllers
import * as UserController from "./controllers/UserController.js"
import * as ProjectController from "./controllers/ProjectController.js"
import * as DescriptionController from "./controllers/DescriptionController.js"
import * as TaskController from "./controllers/TaskController.js"
import * as StatusController from "./controllers/StatusController.js"
import * as CommentController from "./controllers/CommentController.js"
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
//Descriptions
app.post("/descriptions/", CheckAuth, descriptionCreateValidation, DescriptionController.create)
app.get("/descriptions/:id", CheckAuth, DescriptionController.getAll)
app.patch("/descriptions/:id", CheckAuth, descriptionUpdateValidation, DescriptionController.updateTitle)
app.delete("/descriptions/:id", CheckAuth, DescriptionController.remove)
//Tasks
app.post("/tasks", CheckAuth, taskCreateValidation, TaskController.create)
app.get("/tasks/all/:id", CheckAuth, TaskController.getAll)
app.patch("/tasks/:id", CheckAuth, TaskController.updateStatus)
app.patch("/tasks/title/:id", CheckAuth, taskCreateValidation, TaskController.updateTitle)
app.delete("/tasks/:id", CheckAuth, TaskController.remove)
//Status
app.post("/status/", CheckAuth, statusCreateValidation, StatusController.create)
app.get("/status/all/:id", CheckAuth, StatusController.getAll)
app.patch("/status/:id", CheckAuth, statusCreateValidation, StatusController.updateTitle)
app.delete("/status/:id", CheckAuth, StatusController.remove)
//Comments
app.post("/comments/", CheckAuth, commentCreateValidation, CommentController.create)
app.get("/comments/all/:id", CheckAuth, CommentController.getAll)
app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server OK")
})
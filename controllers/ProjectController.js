import {validationResult} from "express-validator";
import ProjectModel from "../models/Project.js"

export const create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new ProjectModel({
            title: req.body.title,
            users: [{
                user: req.userId,
            }]
        })

        const project = await doc.save()

        res.json({project})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать проект"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const project = await ProjectModel.findOne({
            _id: req.params.id,
            users: {
                $elemMatch: {
                    user: req.userId,
                }
            }
        })

        if (!project) {
            return res.status(404).json({
                message: "Проект у пользователя нету"
            })
        }

        res.json({project})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить проект"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const projects = await ProjectModel.find({
            users: {
                $elemMatch: {
                    user: req.userId,
                }
            }
        })

        if (!projects) {
            return res.status(404).json({
                message: "Проекты у пользователя нету"
            })
        }

        res.json({projects})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить проекты"
        })
    }
}

export const updateTitle = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const project = await ProjectModel.findOneAndUpdate(
            {
                _id: req.params.id,
                users: {
                    $elemMatch: {
                        user: req.userId,
                    }
                }
            },
            {
                title: req.body.title
            },
            {
                new: true
            }
        )

        if (!project) {
            return res.status(404).json({
                message: "Проект не был найден"
            })
        }

        res.json({project})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить проект"
        })
    }
}

export const updateUser = async (req, res) => {
    try {

        const project = await ProjectModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $push: { users: { user: req.userId, } } },
            {
                new: true
            }
        )

        if (!project) {
            return res.status(404).json({
                message: "Проект не был найден"
            })
        }

        res.json({project})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить проект"
        })
    }
}

export const remove = async (req, res) => {
    try {

        const task = await ProjectModel.findOneAndDelete(
            {
                _id: req.params.id,
                users: {
                    $elemMatch: {
                        user: req.userId,
                    }
                }
            }
        )

        if (!task) {
            return res.status(404).json({
                message: "Проект не был найден"
            })
        }

        res.json({message: "удален"})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить проект"
        })
    }
}

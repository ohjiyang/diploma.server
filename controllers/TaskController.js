import {validationResult} from "express-validator";
import TaskModel from "../models/Task.js"

export const create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new TaskModel({
            title: req.body.title,
            project: req.body.project,
            status: req.body.status
        })

        const task = await doc.save()

        res.json({task})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать задачу в проекте"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const tasks = await TaskModel.find({
            project: req.params.id,
        }).populate("status").exec()

        if (!tasks) {
            return res.status(404).json({
                message: "Задачи не было найдены"
            })
        }

        res.json({tasks})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить задачи"
        })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const doc = await TaskModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                status: req.body.status
            },
            {
                new: true
            }
        )

        const task = await doc.save()

        res.json({task})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить задачи"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const task = await TaskModel.findOneAndDelete(
            {
                _id: req.params.id,
            },
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
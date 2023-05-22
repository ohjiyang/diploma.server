import {validationResult} from "express-validator";
import StatusModel from "../models/Status.js"

export const create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new StatusModel({
            title: req.body.title,
            project: req.body.project,
        })

        const status = await doc.save()

        res.json({status})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать статус для задачи в проекте"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const status = await StatusModel.find({
            project: req.params.id,
        })

        if (!status) {
            return res.status(404).json({
                message: "Статусы для задач не было найдены"
            })
        }

        res.json({status})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить статусы задач"
        })
    }
}

export const updateTitle = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = await StatusModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                title: req.body.title
            },
            {
                new: true
            }
        )

        const status = await doc.save()

        res.json({status})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить задачи"
        })
    }
}

export const remove = async (req, res) => {
    try {

        const status = await StatusModel.findOneAndDelete(
            {
                _id: req.params.id,
            }
        )

        if (!status) {
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
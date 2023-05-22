import {validationResult} from "express-validator";
import CommentModel from "../models/Comment.js"

export const create = async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new CommentModel({
            title: req.body.title,
            task: req.body.task,
            user: req.userId,
        })

        const comment = await doc.save()

        res.json({comment})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать комментарий"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.find({
            task: req.params.id
        }).populate("user").exec()


        if (!comments) {
            return res.status(404).json({
                message: "Комментарий у задачи нету"
            })
        }

        res.json({comments})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить комментарий"
        })
    }
}
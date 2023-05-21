import {validationResult} from "express-validator";
import DescriptionModel from "../models/Description.js";

export const create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new DescriptionModel({
            title: req.body.title,
            text: req.body.text,
            project: req.body.project,
        })

        const description = await doc.save()

        res.json({description})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать описание для проекта"
        })
    }
}

export const updateTitle = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const description = await DescriptionModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                title: req.body.title,
                text: req.body.text,
            },
            {
                new: true
            }
        )

        if (!description) {
            return res.status(404).json({
                message: "Описания для проекта не был найден"
            })
        }

        res.json({description})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить описаний проекта"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const description = await DescriptionModel.find({
            project: req.params.id,
        })

        if (!description) {
            return res.status(404).json({
                message: "Описаний для проекта не были найдены"
            })
        }

        res.json({description})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить описаний проекта"
        })
    }
}

export const remove = async (req, res) => {
    try {

        const description = await DescriptionModel.findOneAndDelete(
            {
                _id: req.params.id,
            }
        )

        if (!description) {
            return res.status(404).json({
                message: "Описания для проекта не был найден"
            })
        }

        res.json({message: "удален"})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить описаний проекта"
        })
    }
}
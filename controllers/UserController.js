import UserModel from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const candidate = await UserModel.findOne({
            username: req.body.username,
        })

        if (candidate) {
            return res.status(404).json({
                message: "Пользователь c таким именем уже существует"
            })
        }

        const password = await bcrypt.hash(req.body.password, 6)

        const doc = new UserModel({
            username: req.body.username,
            full_name: req.body.full_name,
            passwordHash: password,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, "secret", {
            expiresIn: "30d"
        })

        res.json({token})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        })
    }
}

export const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const candidate = await UserModel.findOne({
            username: req.body.username,
        })

        if (!candidate) {
            return res.status(404).json({
                message: "Пользователь c таким именем не найден"
            })
        }

        const isPassValid = await bcrypt.compare(req.body.password, candidate._doc.passwordHash)

        if (!isPassValid) {
            return res.status(404).json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            _id: candidate._id
        }, "secret", {
            expiresIn: "30d"
        })

        res.json({token})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зайти"
        })
    }
}
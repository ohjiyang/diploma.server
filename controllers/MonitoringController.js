import TaskModel from "../models/Task.js";
import StatusModel from "../models/Status.js";

export const getAll = async (req, res) => {
    try {
        const tasks = await TaskModel.countDocuments({
            status: req.body.status,
            project: req.body.project,
        })


        res.json({tasks})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить задачи"
        })
    }
}

export const getChart = async (req, res) => {
    try {
        let counts = [];

        const statuses = await StatusModel.find({
            project: req.params.id,
        })

        if (!statuses) {
            return res.status(404).json({
                message: "Задачи не было найдены"
            })
        }


        for (let status of statuses) {
            const count = await TaskModel.countDocuments({ project: req.params.id, status: status._id });
            counts.push({ status: status.title, count: count });
        }


        res.json({counts})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить задачи"
        })
    }
}
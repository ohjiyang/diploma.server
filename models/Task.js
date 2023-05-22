import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        default: '',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        default: null,
    },
    execution_date: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
})

export default mongoose.model("Task", TaskSchema) 
import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
}, {
    timestamps: true
})

export default mongoose.model("Status", StatusSchema)
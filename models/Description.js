import mongoose from "mongoose";

const DescriptionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
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

export default mongoose.model("Description", DescriptionSchema)
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

})

export default mongoose.model("Comment", CommentSchema)
import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        Title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        doration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        ispublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

export const Video = mongoose.model("Video", videoSchema)
"use strict";
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
    },
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            commentedBy: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
const Post = (0, mongoose_1.model)('Post', postSchema);
module.exports = Post;

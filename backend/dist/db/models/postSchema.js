"use strict";
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    commentedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
const postSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }],
    commentNo: {
        type: Number,
        default: 0,
    },
    comments: [commentSchema],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
const Post = (0, mongoose_1.model)('Post', postSchema);
module.exports = Post;

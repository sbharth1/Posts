"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = exports.like = void 0;
const postSchema_1 = __importDefault(require("../../db/models/postSchema"));
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        res.status(401).send({ msg: "User not authenticated" });
        return;
    }
    try {
        const post = yield postSchema_1.default.findById(id);
        if (!post) {
            res.status(404).send({ msg: "Post not found" });
            return;
        }
        const hasLiked = post.likedBy.includes(userId);
        if (hasLiked) {
            if (post.likes > 0) {
                post.likes -= 1;
                post.likedBy = post.likedBy.filter((id) => id != userId);
                yield post.save();
                res.status(200).send({ msg: "Post unliked successfully", ok: false });
                return;
            }
            else {
                res.status(400).send({ msg: "Cannot unlike, likes already at zero" });
                return;
            }
        }
        else {
            if (post.likes >= 0) {
                post.likes += 1;
                post.likedBy.push(userId);
                yield post.save();
            }
            else {
                res.status(400).send({ msg: "Cannot like, likes not at zero" });
                return;
            }
            res.status(200).send({ msg: "Post liked successfully", ok: true });
            return;
        }
    }
    catch (err) {
        console.error(err, "-- Error in like controller");
        res.status(500).send({ msg: "Internal Server Error" });
        return;
    }
});
exports.like = like;
// comments -----------------
const comments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const post = yield postSchema_1.default.findOneAndUpdate({ _id: id });
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const newComment = {
            text: comment,
            created: new Date(),
            commentedBy: userId,
        };
        post.comments.push(newComment);
        yield post.save();
        res.status(200).json({
            message: "Comment added successfully",
            ok: true,
        });
        return;
    }
    catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.comments = comments;

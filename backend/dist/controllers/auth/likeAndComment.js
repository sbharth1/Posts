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
exports.like = void 0;
const postSchema_1 = __importDefault(require("../../db/models/postSchema"));
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        if (!userId) {
            res.status(400).send({ msg: "User not authenticated" });
            return;
        }
        const post = yield postSchema_1.default.findById(id);
        if (!post) {
            res.status(404).send({ msg: 'Post not found' });
            return;
        }
        if (post.likedBy.includes(userId)) {
            post.likes -= 1;
            res.status(200).send({ msg: "Post unliked successfully" });
            return;
        }
        else {
            post.likedBy.push(userId);
            post.likes += 1;
        }
        yield post.save();
        console.log(post);
        res.status(200).send({ msg: 'Post liked successfully' });
        return;
    }
    catch (err) {
        console.log(err, "--err in backend");
        res.status(404).send("Internal Server Error...");
        return;
    }
});
exports.like = like;

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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../routes/router"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const postSchema_1 = __importDefault(require("../db/models/postSchema"));
const jwt_1 = require("../utils/jwt");
const userSchema_1 = __importDefault(require("../db/models/userSchema"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", router_1.default);
// For image upload route----------------------------------------
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
const uploadsDir = path_1.default.join(__dirname, "../uploads/images/");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/posts", jwt_1.verifyToken, upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { description } = req.body;
        const image = req.file;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).json({ message: "User ID not found" });
            return;
        }
        console.log(userId, '--------------userId');
        if (!description || !image) {
            res.status(400).json({ message: "Description and image are required" });
            return;
        }
        const imageUrl = `/uploads/images/${image.filename}`;
        const newPost = new postSchema_1.default({
            description,
            image: imageUrl,
            likes: 0,
            commentsNo: 0,
            likedBy: [],
            comments: [],
            user: userId,
        });
        console.log(description, '---------description');
        const savedPost = yield newPost.save();
        console.log('---after description');
        yield userSchema_1.default.findByIdAndUpdate(userId, {
            $push: { posts: savedPost._id },
        }, { new: true });
        res
            .status(200)
            .json({ message: "Post added successfully", post: savedPost });
        return;
    }
    catch (err) {
        console.error("Error saving post:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = app;

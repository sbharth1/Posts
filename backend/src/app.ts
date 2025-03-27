import express from "express";
import cors from "cors";
import router from "../routes/router";
import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import fs from "fs";
import Post from "../db/models/postSchema";
import { verifyToken } from "../utils/jwt";
import User from "../db/models/userSchema";
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

// For image upload route----------------------------------------
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const uploadsDir = path.join(__dirname, "../uploads/images/");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post(
  "/posts",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { description } = req.body;
      const image = req.file;
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: "User ID not found" });
        return;
      }
      console.log(userId,'--------------userId')
      if (!description || !image) {
        res.status(400).json({ message: "Description and image are required" });
        return;
      }
      const imageUrl = `/uploads/images/${image.filename}`;

      const newPost = new Post({
        description,
        image: imageUrl,
        likes: 0,
        commentsNo: 0,
        likedBy: [],
        comments: [],
        user: userId,
      });

      console.log(description,'---------description')

      const savedPost = await newPost.save();

console.log('---after description')
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { posts: savedPost._id },  
        },
        { new: true } 
      );

      res
        .status(200)
        .json({ message: "Post added successfully", post: savedPost });
      return;
    } catch (err) {
      console.error("Error saving post:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export = app;

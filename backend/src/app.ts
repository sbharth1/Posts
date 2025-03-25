import express from 'express';
import cors from 'cors';
import router from '../routes/router';
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import fs from 'fs';
const app = express();

// CORS setup
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

// For image upload route----------------------------------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const uploadsDir = path.join(__dirname, '../uploads/images/');
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
  '/posts',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { description } = req.body;
    const image = req.file;

    if (!description || !image) {
      res.status(400).json({ message: 'Description and image are required' });
      return;
    }
    const imageUrl = `/uploads/images/${image.filename}`;

    const newPost = {
      description,
      imageUrl,
    };

    res.status(200).json({ message: 'Post added successfully', post: newPost });
  }
);

export = app;


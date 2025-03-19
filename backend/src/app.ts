import express from 'express';
import cors from 'cors';
import { signup } from '../controllers/auth/signup';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:36317',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/signup",signup);


export = app;
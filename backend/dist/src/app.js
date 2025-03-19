"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = require("../controllers/auth/signup");
const login_1 = require("../controllers/auth/login");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:36317',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post("/signup", signup_1.signup);
app.post("/login", login_1.login);
module.exports = app;

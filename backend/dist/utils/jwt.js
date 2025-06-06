"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    console.log('secret_key is undefined...');
}
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: '1w' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(403).json({ "message": "No Token Provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = { userId: decoded.userId };
        next();
    }
    catch (err) {
        res.status(500).json({ "message": "server error" });
        return;
    }
};
exports.verifyToken = verifyToken;

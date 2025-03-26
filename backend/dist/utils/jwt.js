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
    return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    var _a;
    console.log(req.headers, '----req.headers from verifyToken----------');
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(403).json({ "message": "No Token Provided" });
            return;
        }
        console.log('---token111');
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(decoded, '---decoded');
        req.user = { userId: decoded.userId };
        console.log('---token222');
        next();
    }
    catch (err) {
        res.status(500).json({ "message": "server error" });
        return;
    }
};
exports.verifyToken = verifyToken;

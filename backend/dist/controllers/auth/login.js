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
exports.login = void 0;
const connect_1 = __importDefault(require("../../db/config/connect"));
const userSchema_1 = __importDefault(require("../../db/models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                msg: 'Both fields are required',
            });
            return;
        }
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }
        if (!user.password) {
            res.status(401).json({
                message: 'Invalid password',
            });
            return;
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: 'Invalid password',
            });
            return;
        }
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res.status(200).json({
            message: 'Login successful',
            token,
            data: {
                userId: user._id,
                email: user.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
exports.login = login;

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
exports.signup = void 0;
const connect_1 = __importDefault(require("../../db/config/connect"));
const userSchema_1 = __importDefault(require("../../db/models/userSchema"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.json({
                msg: 'all fields not filled..',
            });
            return;
        }
        const userExist = yield userSchema_1.default.findOne({ email });
        if (userExist) {
            res.status(404).json({
                message: 'User already exist',
            });
            return;
        }
        const user = new userSchema_1.default(req.body);
        yield user.save();
        console.log(firstName, lastName, email, password, '-- some shit users...');
        res.status(200).json({
            msg: 'signup successfully...',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Interanal Server Error',
        });
    }
});
exports.signup = signup;

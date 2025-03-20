"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
// import { Request, Response, NextFunction } from 'express';
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
// const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
//   console.log(req)
//   try{
//     const token = req.headers['authorization']?.split(' ')[1];
//     if(!token){
//       return res.status(403).json({"message":"No Token Provided"})
//     }
//     const decoded = jwt.verify(token,SECRET_KEY);
//     req.userId = decoded.userId;
//     next()
//   }catch(err){
//   return res.status(500).json({"message":"server error"})
//   }
// }

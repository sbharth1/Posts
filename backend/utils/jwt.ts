import { Request, Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY) {
  console.log('secret_key is undefined...');
}

 const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

 const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
  try{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
       res.status(403).json({"message":"No Token Provided"});
       return;
    }
    const decoded = jwt.verify(token,SECRET_KEY) as {userId:string};
    req.user = {userId:decoded.userId};
    next();
  }catch(err){
   res.status(500).json({"message":"server error"});
   return;
  }
}


export {generateToken,verifyToken}
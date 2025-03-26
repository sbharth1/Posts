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
  console.log(req.headers,'----req.headers from verifyToken----------')
  try{
    const token = req.headers['authorization']?.split(' ')[1];
    
    if(!token){
       res.status(403).json({"message":"No Token Provided"});
       return;
    }
    console.log('---token111')
    const decoded = jwt.verify(token,SECRET_KEY) as {userId:string};
    console.log(decoded,'---decoded')
    req.user = {userId:decoded.userId};
    console.log('---token222')
    next()
  }catch(err){
   res.status(500).json({"message":"server error"});
   return;
  }
}


export {generateToken,verifyToken}
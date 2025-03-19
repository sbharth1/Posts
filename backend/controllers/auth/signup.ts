import { Request,Response } from "express"
import dbConnect from "../../db/config/connect"

export const signup = async(req:Request,res:Response)=>{
await dbConnect();

const {firstName,lastName,email,password} = req.body;

console.log(firstName,lastName,email,password,'--some shit...')

  res.json({
    msg:"user inserted..."
})

}



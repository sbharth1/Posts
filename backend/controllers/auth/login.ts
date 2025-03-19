import { Request,Response } from "express"
import dbConnect from "../../db/config/connect"

export const login = async(req:Request,res:Response)=>{
await dbConnect();



}



import { Request,Response } from "express";
import Post from "../../db/models/postSchema";

export const getPosts = async (req:Request,res:Response)=>{
    const userId = req.user?.userId;
    if(!userId){
        res.status(400).json({message:"User ID not found"});
        return;
    }
    const posts = await Post.findById(userId);
    res.send(posts);

    
}

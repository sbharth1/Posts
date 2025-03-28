import { Request, Response } from "express";
import Post from "../../db/models/postSchema";
import dbConnect from "../../db/config/connect";

export const getPosts = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const posts = await Post.find();
    if(!posts || posts.length === 0){
     res.status(204).json({ message: "No posts found" });
      return;
    }
    res.status(200).json(posts);
    return;
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

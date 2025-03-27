import { Request, Response } from "express";
import Post from "../../db/models/postSchema";

export const getPosts = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(400).json({ message: "User ID not found" });
    return;
  }

  try {
    const posts = await Post.find().populate("user");
    console.log(posts,'---posts'); 

    res.status(200).json(userId);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

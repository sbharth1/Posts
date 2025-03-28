import { Request, Response } from "express";
import User from "../../db/models/userSchema";

export const user = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(400).json({ message: "User ID not found" });
    return;
  }

  try {
    const userPost = await User.findById(userId).populate("posts");

    if (!userPost) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    if (!userPost.posts || userPost.posts.length === 0) {
      res.status(404).json({ message: "No posts found for this user" });
      return;
    }

    res.status(200).json(userPost);
    return;
  } catch (error) {
    console.error("Error fetching user posts:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
};

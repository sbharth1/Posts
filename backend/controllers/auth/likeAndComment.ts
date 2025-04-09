import { Response, Request } from "express";
import Post from "../../db/models/postSchema";
export const like = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  try {
    if (!userId) {
      res.status(400).send({ msg: "User not authenticated" });
      return;
    }
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send({ msg: "Post not found" });
      return;
    }

    if (post.likedBy.includes(userId)) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((like) => like !== userId);
      res.status(200).send({ msg: "Post unliked successfully" });
      return;
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }
    console.log(post);
   
    await post.save();
    res.status(200).send({ msg: "Post liked successfully" });
    return;
  } catch (err) {
    console.log(err, "--err in backend");
    res.status(404).send("Internal Server Error...");
    return;
  }
};

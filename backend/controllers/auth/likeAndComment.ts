import { Response, Request } from "express";
import Post from "../../db/models/postSchema";

export const like = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).send({ msg: "User not authenticated" });
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send({ msg: "Post not found" });
      return;
    }

    const hasLiked = post.likedBy.includes(userId);

    if (hasLiked) {
      if (post.likes > 0) {
        post.likes -= 1;
        post.likedBy = post.likedBy.filter((id)=> id != userId);
        await post.save();
        res.status(200).send({ msg: "Post unliked successfully" });
        return;
      } else {
        res.status(400).send({ msg: "Cannot unlike, likes already at zero" });
        return;
      }
    } else {
      if (post.likes >= 0) {
        post.likes += 1;
        post.likedBy.push(userId);
        await post.save();
      } else {
        res.status(400).send({ msg: "Cannot like, likes not at zero" });
        return;
      }
      res.status(200).send({ msg: "Post liked successfully" });
      return;
    }
  } catch (err) {
    console.error(err, "-- Error in like controller");
    res.status(500).send({ msg: "Internal Server Error" });
    return;
  }
};

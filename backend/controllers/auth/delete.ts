import { Response, Request } from "express";
import Post from "../../db/models/postSchema";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(204).send({ msg: "Post already deleted" });
      return;
    }

    const deletePost = await Post.findOneAndDelete({ _id: id });

    if (!deletePost) {
      res.status(404).send({ msg: "Post not found" });
      return;
    }

    res.status(200).send({ msg: "Post deleted successfully" });
    return;
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ msg: "Server error", error });
    return;
  }
};

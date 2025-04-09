import { Response, Request } from "express";
export const Like = async(req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  try {
    console.log(userId, "---userId");
    console.log(id, "--likeid");
     res.status(200).send({ msg: "success" });
     return;
  } catch (err) {
    console.log(err, "--err in backend");
     res.status(404).send("Internal Server Error...");
     return;
  }
};

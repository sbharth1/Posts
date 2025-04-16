import { Response,Request } from "express";


export const deleteUser = async (req:Request,res:Response) => {
    const { id } = req.params;
    console.log(id);

    res.send('delete this shit...')     


}
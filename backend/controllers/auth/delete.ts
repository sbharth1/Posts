import { Response,Request } from "express";


const deleteUser = async (req:Request,res:Response) => {
    const { id } = req.params;
    console.log(id);

    res.send('delete this shit...')     


}
import { Request, Response } from 'express';
import dbConnect from '../../db/config/connect';
import User from '../../db/models/userSchema';

export const signup = async (req: Request, res: Response) => {
  try {
    await dbConnect();

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.json({
        msg: 'all fields not filled..',
      });
      return;
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(404).json({
        message: 'User already exist',
      });
      return;
    }

    const user = new User(req.body);
    await user.save();

    console.log(firstName, lastName, email, password, '-- some shit users...');

    res.json({
      msg: 'signup successfully...',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Interanal Server Error',
    });
  }
};

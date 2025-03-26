import { Request, Response } from 'express';
import dbConnect from '../../db/config/connect';
import User from '../../db/models/userSchema';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try {
    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        msg: 'Both fields are required',
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    if (!user.password) {
      res.status(401).json({
        message: 'Invalid password',
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: 'Invalid password',
      });
      return;
    }

  const token  = generateToken(user._id.toString()); 

    res.status(200).json({
      message: 'Login successful',
      token,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      where: { email },
    });

    //  If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    //  Check if password matches
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT Token
    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign(
      { userId: user.getDataValue('id'), email: user.getDataValue('email') },
      secretKey,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

//  POST /login - Login a user
router.post('/login', login); // need to figure out this overload matches call error

export default router;
git 
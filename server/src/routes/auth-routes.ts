import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({
            where: { email },
        });

        //  If user not found, return error
        if (!user) {
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }

        //  Check if password matches
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }

        // Generate JWT Token
        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(
            { userId: user.getDataValue('id'), email: user.getDataValue('email') },
            secretKey,
            { expiresIn: '1h' }
        );

        res.json({ token });
        return; 
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
        return; 
    }
};

const router = Router();

//  POST /login - Login a user
router.post('/login', login); // need to figure out this overload matches call error

export default router;

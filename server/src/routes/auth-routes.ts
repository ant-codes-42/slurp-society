import { Router, Request, Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {sendVerificationEmail} from '../services/emailService.js';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, } = req.body;

        // Find the user by email
        const user = await User.findOne({
            where: { email },
        });

        //  If user not found, return error
        if (!user) {
            console.log('User not found');
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }

        //  Check if password matches
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            console.log('Password is invalid');
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }

        // Generate JWT Token
        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(
            { id: user.getDataValue('id'), email: user.getDataValue('email') },
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

export const register = async (req: Request, res: Response): Promise <void> => {
    try {
        const {email, password, phone, name } = req.body;

        //check if the user already exists 
        const existingUser = await User.findOne ({where: {email} });

        if(existingUser) {
            res.status(400).json({ message: 'User already exists'});
            return;
        }

        //hash password before storing it
        //const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user (via their email)
        const newUser = await User.create({
            email,
            phone, 
            name,
            password
        });

        console.log(`New user created: ${newUser.email}`); 

        //sends verification email from emailService to users email
        await sendVerificationEmail(email);

        res.status(201).json({message: 'Registration succesful.  Welcome email sent!'});

        return;

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({message: 'Server error'});
        return;
    }

}

const router = Router();

//  POST /login - Login a user
router.post('/login', login); // need to figure out this overload matches call error

// POST /register - register a user
router.post('/register', register);

export default router;


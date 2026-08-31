import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import { createAuthToken, setAuthCookie, clearAuthCookie } from '../utils/auth.js';
import { sendWelcomeEmail } from '../utils/email.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Details Missing' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.json({ success: false, message: 'User already exists' });

        const user = await userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'Admin'
        });

        setAuthCookie(res, createAuthToken(user._id));

        try {
            await sendWelcomeEmail(email);
        } catch (mailError) {
            console.error('Email delivery skipped/failed:', mailError.message);
        }

        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Invalid password' });

        setAuthCookie(res, createAuthToken(user._id));
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        clearAuthCookie(res);
        return res.json({ success: true, message: 'Logged Out' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

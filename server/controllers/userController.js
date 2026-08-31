import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { createOtp, getOtpExpiry } from '../utils/otp.js';
import { sendVerificationEmail } from '../utils/email.js';

const getAuthenticatedUserId = (req) => req.userId || req.body.userId;

const publicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isAccountVerified ? 'Active' : 'Invited',
    joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''
});

export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        if (!userId) return res.json({ success: false, message: 'User ID is required' });

        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: 'User not found' });
        if (user.isAccountVerified) return res.json({ success: false, message: 'Account already verified' });

        user.verifyOtp = createOtp();
        user.verifyOtpExpireAt = getOtpExpiry();
        await user.save();
        await sendVerificationEmail(user.email, user.verifyOtp);

        return res.json({ success: true, message: 'Verification OTP sent' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = getAuthenticatedUserId(req);

    if (!userId || !otp) return res.json({ success: false, message: 'Missing Details' });

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: 'User not found' });
        if (!user.verifyOtp || user.verifyOtp !== otp) return res.json({ success: false, message: 'Invalid OTP' });
        if (user.verifyOtpExpireAt < Date.now()) return res.json({ success: false, message: 'OTP Expired' });

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Email verified Successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) return res.status(401).json({ success: false, message: 'User not found' });
        return res.json({ success: true, user: publicUser(user) });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const listUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').sort({ createdAt: -1 });
        return res.json({ success: true, users: users.map(publicUser) });
    } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
};

export const createUser = async (req, res) => {
    const { name, email, password = 'ChangeMe123!', role = 'Viewer' } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(409).json({ success: false, message: 'User already exists' });
        const user = await userModel.create({ name, email, role, password: await bcrypt.hash(password, 10) });
        return res.status(201).json({ success: true, user: publicUser(user) });
    } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

export const updateUser = async (req, res) => {
    const { name, email, role } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'A valid user ID is required' });
    }
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true, runValidators: true }).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        return res.json({ success: true, user: publicUser(user) });
    } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

export const deleteUser = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'A valid user ID is required' });
    }
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        return res.json({ success: true, message: 'User deleted' });
    } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};
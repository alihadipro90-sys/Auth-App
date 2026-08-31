import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], default: 'Viewer' },
        verifyOtp: { type: String, default: '' },
        verifyOtpExpireAt: { type: Number, default: 0 },
        isAccountVerified: { type: Boolean, default: false },
        resetOtp: { type: String, default: '' },
        resetOtpExpireAt: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default userSchema;
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema.js';

const userModel = mongoose.models.user || mongoose.model('users', userSchema);

export default userModel;

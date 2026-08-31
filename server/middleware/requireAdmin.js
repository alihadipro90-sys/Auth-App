import userModel from '../models/userModel.js';

const requireAdmin = async (req, res, next) => {
    const user = await userModel.findById(req.userId).select('role');
    if (!user || user.role !== 'Admin') {
        return res.status(403).json({ success: false, message: 'Admin access is required' });
    }
    next();
};

export default requireAdmin;
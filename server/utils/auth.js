import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const createAuthToken = (userId) => jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);

export const setAuthCookie = (res, token) => {
    res.cookie('token', token, cookieOptions);
};

export const clearAuthCookie = (res) => {
    res.clearCookie('token', cookieOptions);
};
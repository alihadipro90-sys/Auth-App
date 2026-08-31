export const createOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const getOtpExpiry = () => Date.now() + 24 * 60 * 60 * 1000;
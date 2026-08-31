import JWT from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token){
        return res.json({ success: false, message: 'Not Authorizwd. Login Again' });

    }

    try{
        const tokenDecode = JWT.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
            return res.json({ success: false, message: 'Not Authrized. Login again ' });
        }
        next();

    } catch(error){
        res.json({ success: false, message: error.message });
    }
}

export default userAuth;
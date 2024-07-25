import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
    const token = req.cookies.sid;
    //console.log("token: ",token);
    if (!token) {
        return res.status(401).json({ message: "Please login", isLoggedIn: false });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log("Token verified successfully:", data);
        req.user = data;
        next();
    } catch (err) {
        //console.error("Token verification failed:", err.message);
        res.status(401).json({ message: "Unable to process", isLoggedIn: false });
    }

}

export default authorization;
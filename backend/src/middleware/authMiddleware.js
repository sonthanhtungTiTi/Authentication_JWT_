import jwt from "jsonwebtoken";
import User from "../model/user.js";npm i react-router axios lucide-react tailwindcss @tailwindcss/vite tailwindcss-animate zustand zod react-hook-form @hookform/resolvers sonner
//authorization middleware xac thuc nguoi dung
export const protectedRouter = async (req, res, next) => {

    try {
        //lay token tu header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "khong tim thay access token"
            });
        }
        //verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        //tim user tu token
        const user = await User.findById(decoded.userId).select("-hashedPassword");
        if (!user) {
            return res.status(404).json({
                message: "Khong tim thay nguoi dung"
            });
        }   
        //tra ve user
        req.user = user;
        next();

    } catch (error) {
        console.error("Loi xac thuc token:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token da het han" });
        }
        return res.status(401).json({
            message: "loi token het han hoac khong hop le"
        });
    }
}
import User from "../model/user.js";
import jwt from "jsonwebtoken";
export const authMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.error("Lỗi tại userController - authMe:", error);
        return  res.status(500).json({ message: "Lỗi server" });
        
    }
};
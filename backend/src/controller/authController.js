import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Session } from '../model/session.js';
import cookieParser from 'cookie-parser';


const ACCESS_TOKEN_TIME = '30m';
const REFRESH_TOKEN_TIME = 10 * 24 * 60 * 60 * 1000; // 10 ngay

export const signUp = async (req, res) => {
    try {
        //lay tu form dc gui len
        const {
            username,
            password,
            email,
            firstname,
            lastname
        } = req.body;
        if (!username || !password || !email || !firstname || !lastname) {
            return res.status(400).json({
                message: "KHONG THE THIEU THONG TIN USERNAME, PASSWORD, EMAIL, FIRSTNAME, LASTNAME"
            });
        }
        //ktra ton tai
        const doplicateUser = await User.findOne({
            username
        });
        if (doplicateUser) {
            return res.status(409).json({
                message: "USERNAME DA TON TAI"
            });
        }
        //ma hoa password
        const hashedPassword = await bcrypt.hash(password, 10); //salt ma hoa
        //tao user moi
        const newUser = await User.create({
            username,
            hashedPassword,
            email,
            displayName: firstname + " " + lastname,
        });
        //return user moi tao
        return res.status(201).json({
            message: "DANG KY THANH CONG",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                displayName: newUser.displayName
            }
        });
    } catch (error) {
        console.error("Loi tai authController - signUp:", error);
        return res.status(500).json({
            message: "LOI SERVER",
            error: error.message
        });
    }

}
export const signIn = async (req, res) => {
    try {
        //lay input tu form gui len
        const {
            username,
            password
        } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "KHONG THE THIEU THONG TIN USERNAME HOAC PASSWORD"
            });
        }
        //ktra user ton tai chua
        const user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(401).json({
                message: "THONG TIN USERNAME HOAC PASSWORD KHONG DUNG"
            });
        }
        //ktra trong hashpassword co trung khop ko voi input khong
        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "THONG TIN USERNAME HOAC PASSWORD KHONG DUNG"
            });
        }
        // neu khop thi tao access token jwt
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: ACCESS_TOKEN_TIME }
        );
        //tao token refresh
        const rfToken = crypto.randomBytes(64).toString('hex');
        //tao session luu token refesh token
        await Session.create({
            userId: user._id,
            refreshToken: rfToken,
            exportedAt: new Date(Date.now() + REFRESH_TOKEN_TIME), 
        });
        // tr refesh token gui ve client cookie
        res.cookie('refreshToken', rfToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // chi dung secure khi o production (https)
            sameSite: 'Lax',
            maxAge: REFRESH_TOKEN_TIME,
        });
         //cookie luu o trinh duyet client

        //tra ve token jwt cho client res 
        return res.status(200).json({
            message: "DANG NHAP THANH CONG " + user.displayName,
            accessToken: token,
        });
    } catch (error) {
        console.error("Loi tai authController - signIn:", error);
        return res.status(500).json({
            message: "LOI SERVER",
            error: error.message
        });
    }


}
export const signOut = async (req, res) => {
    try {
        //lay refresh token tu cookie
        const token = req.cookies?.refreshToken;
        if(token){
            await Session.deleteOne({refreshToken: token});
            //xoa refresh token trong db
            res.clearCookie('refreshToken'); 
        }
        //xoa cookie refresh token tren trinh duyet client
        return res.status(200).json({ message: "DANG XUAT THANH CONG" });
    }catch (error) {
        console.error("Loi tai authController - signOut:", error);
        return res.status(500).json({
            message: "LOI SERVER",
            error: error.message
        });
    }
}
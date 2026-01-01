//controller logic
//router định nghĩa các đường day API
//model tương tác với database
//service xử lý logic nghiệp vụ
//middleware xử lý các yêu cầu trước khi đến controller
//library các thư viện bên thứ 3 hỗ trợ
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from "./libs/db.js";
import authRouter from "./router/authRoute.js";

dotenv.config(); //load bien moi truong tu file .env


const app= express();
const PORT = process.env.PORT || 5000;

//meiddleware 
app.use(express.json()); //cho express biet doc duoc json trong body
app.use(cookieParser()); //cho phep doc cookie tu request
app.use(cors({
    origin: 'http://localhost:5173', // Thay đổi thành URL frontend của bạn
    credentials: true
}));
//publc router
app.use('/api/auth', authRouter);




connectDB().then(()=>{
    //chay server
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    }); 
});

 
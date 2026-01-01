import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("DB successfully connected");
    }catch(error){
        console.log("connetion failed", error);
        process.exit(1);
    }
};


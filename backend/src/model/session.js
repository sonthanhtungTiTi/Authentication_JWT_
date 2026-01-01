import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
        index: true,
    },
    refreshToken:{  
        type: String,
        required: true,
        unique: true,   
    },    
    exportedAt:{
        type: Date,
        default: Date.now,
    },
});
sessionSchema.index({exportedAt: 1}, {expireAfterSeconds: 0}); // xoa document khi het han
export const Session = mongoose.model("Session", sessionSchema);
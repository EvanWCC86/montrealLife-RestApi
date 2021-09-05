const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        
    },
    desc: {
        type:String,
        required:true,
    },
    images: [
        {
            type:String,
            default:"",
        }
    ],
    likes: [
        {
            userId:String,
            createdAt: String,
        }
    ],
    comments:[
        {
            body:String,
            userId:String,
            createdAt:String
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema);
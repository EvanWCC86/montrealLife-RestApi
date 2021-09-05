const mongoose = require('mongoose');

const CarPostSchema = new mongoose.Schema({
    carAgentId:{
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
    carYear:{
        type:Number,
        default:null,
    },
    brand:{
        type:String,
        default:"",
    },
    type:{
        type:String,
        default:"",
    },
    km: {
        type:Number,
        default:null,
    },
    price:{
        type:Number,
        default:null,
    },

    images: {
        type:Array,
        default:[],
    },
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

module.exports = mongoose.model("CarPost", CarPostSchema);
const mongoose = require('mongoose');

const HousePostSchema = new mongoose.Schema({
    houseAgentId:{
        type:String,
        required:true,
    },
    realtorId: {
        type:String,
        default:"",
    },
    desc:{
        type:String,
        default:"",
    },
    buildingType:{
        type:String,
        default:""
    },
    
    images: {
        type:Array,
        default:[],
    },
    city: {
        type:String,
        default:"",
    },
    address: {
        type:String,
        default:""
    },
    
    salesType: {
        type:String,
        default:""
    },
    
   
    
    price: {
        type:Number,
        default:null
    },
    year: {
        type:Number,
        default:null
    },
    bedrooms: {
        type:Number,
        default:null
    },
    bathroom: {
        type:Number,
        default:null
    },
    driveway: {
        type:Number,
        default:null
    },
    garage: {
        type:Number,
        default:null
    },
    lot_area: {
        type:Number,
        default:null
    },
    
    comments:[
        {
            body:String,
            userId:String,
            createdAt:String
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model("HousePost", HousePostSchema);
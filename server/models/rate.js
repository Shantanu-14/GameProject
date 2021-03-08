const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    game:{
        type:ObjectId,
       ref:"Game"
    },
    rating:{
        type:Number,
        default:0
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
})

mongoose.model("Rate",postSchema)
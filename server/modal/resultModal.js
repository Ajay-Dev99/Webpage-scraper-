const mongoose = require('mongoose')


const resultModalSchema = new mongoose.Schema({
    domainName :{
        type:String,
        required:true
    },
    wordCount:{
        type:String
    },
    favouriteStatus:{
        type:Boolean,
        default:false
    },
    webLinks:{
        type:[]
    },
    mediaLinks:{
        type:[]
    }
})

module.exports = new mongoose.model("results",resultModalSchema)
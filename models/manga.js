const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const mangaSchema = new Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },cover:{
        type:String,
        required:true
    },auteur:{
        type:String,
        required:false
    },rating:{
        type:Number,
        required:false,
    },numberOfChapters:{
        type:Number,
        required:false
    },
    chapters:[{
        type:Schema.Types.ObjectId,
        ref:"Chapter",
        require:false
    }]
},{timestamps:true})
const Manga = mongoose.model('Manga',mangaSchema);
module.exports = Manga;
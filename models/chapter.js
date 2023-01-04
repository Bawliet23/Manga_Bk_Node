const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
    name:String,
    number:Number,
    images:[String],
    manga:{
        type:Schema.Types.ObjectId,
        ref:"Manga"
    }
},{timestamps:true})
module.exports = mongoose.model("Chapter",ChapterSchema);
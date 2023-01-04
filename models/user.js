const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },password:{
        type:String,
        required:true
    },
    role:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }

},{timestamps:true})
module.exports = mongoose.model('User',userSchema);
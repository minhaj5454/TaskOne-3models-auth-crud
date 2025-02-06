const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
type:String,
required:true
}

})

const userModel = new mongoose.model("userCollections",userSchema)

module.exports={
    userModel,
}
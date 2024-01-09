const mongoose = require("mongoose");

const userInfo = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    githubLink :{
        type: String,
        required: true,
      },
      
    Bio :{
       type: String,
       required: true,
      } 

})
 
const UserInfo = new mongoose.model("Info",userInfo);
module.exports = UserInfo;
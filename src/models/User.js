const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
      },
      
    confirmPassword :{
       type: String,
       required: true,
      } 

});


//hashing password  
userSchema.pre("save"  ,  async function(next){
 if(this.isModified("password")){
    this.password= await bcrypt.hash (this.password,10);
       this.confirmPassword= await bcrypt.hash(this.confirmPassword,10);


    }
    next();
});
    


const Register = new mongoose.model("Profile",userSchema);
module.exports = Register;
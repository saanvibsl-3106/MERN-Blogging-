const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,   
        require:true,
    },
    email:{
        type:String,   
        require:true,
    },
    phone:{
        type:String,   
        require:true,
    },
    password:{
        type:String,   
        require:true,
    },
    isAdmin:{
        type:Boolean,   
        default:false,
    }
});
//bcrypt the password
//this -> tell us about the current added complete parsed document
userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }
    try{
       const saltRound= await bcrypt.genSalt(10);
       const hashedPassword= await bcrypt.hash(user.password,saltRound);
        user.password=hashedPassword;
    }catch(error){
          next(error);
    }
});

//compare password authentification
userSchema.methods.comparePassword=async function(password){
   return bcrypt.compare(password,this.password);
}

// generate the token
userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email : this.email,
            isAdmin:this.isAdmin
        },
        process.env.SECRET_KEY,
        {
        expiresIn:"30d"
        });
    }catch(error){
        console.error(error);
    }
};
const User = new mongoose.model("USER", userSchema);
module.exports=User;
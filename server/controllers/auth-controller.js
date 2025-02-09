const User= require("../models/user-model")
const bcrypt=require("bcryptjs");

const home =async(req,res)=>{
    try{
       res.status(200).send("Server started controller successfully ");
    }catch{
        console.log("error");
    }
}
// const register=async(req,res)=>{
//     try{
//         console.log(req.body);
//         res.status(200).json({message: req.body });
//     }catch(error){
//         res.status(500).json("error in registration ");
//     }
// }

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      // msg: userCreated,
      msg:"resgistration successful!",
      token:await userCreated.generateToken(),
      userID:userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const userExist=await User.findOne({email});
      if(!userExist){
        return res.status(400).json({message:"user not found"});
      }
      // const UserP=await bcrypt.compare(password,userExist.password);
      const UserP=await userExist.comparePassword(password);
      if(UserP){
        res.status(200).json({
          msg:"login successful",
          token:await userExist.generateToken(),
          userID:userExist._id.toString(),
        });
      }else{
         res.status(400).json({msg:"invalid password"});
      }
    }catch(error){
      // res.status(500).json({msg:"internal server error"});
      next(error);
    }
};

// to send user data
const user=async(req,res)=>{
  try{
     const userData=req.user;
     console.log(userData);
     return res.status(200).json({userData});
    // res.status(200).json({msg :"hi user"});
  }catch(error){
    console.log('error from the user route ${error}');
  }
}

module.exports = { home, register,login ,user };
const jwt=require('jsonwebtoken');
const User=require("../models/user-model");
const authMiddleware=async (req,res,next)=>{
   const token=req.header('Authorization');
   if(!token){
    return res.status(401).json({error:'Access Denied'});
   }
   
   const jwtToken =token.replace("Bearer","").trim();
   console.log('token from auth middleware',jwtToken);
    
   try{

    //why we are verifying token with secret key?
     //Decodes and verifies the token's signature using the SECRET_KEY
     //that we used during sign const token = jwt.sign({ userId: 123 }, process.env.SECRET_KEY, { expiresIn: "1h" });

    const isVerified=jwt.verify(jwtToken,process.env.SECRET_KEY);
    console.log("verfired",isVerified);

    // This is used in MongoDB's Mongoose to exclude the password field from the query result. .select() not to retrive password data 
    const userData=await User.findOne({email:isVerified.email}).select ({
        password:0,
    });

    console.log("userdata",userData);
    req.user=userData;
    req.token=token;
    req.userID=userData._id;

    next();// Pass control to the next middleware or route handler

   }catch(error){
    return res.status(401).json({error:'Access Denied 2'});
   }
  
};
module.exports=authMiddleware;

const Contact = require("../models/contact-model");

const contactForm=async(req,res)=>{
  try{
     const response=req.body;
     await Contact.create(response);
     console.log(response);
     res.status(200).json({mesaage:"successful contact send"});
  }catch(err){
    res.status(500).json({message:"message bot delieverd in contacts"});
  }
};

module.exports=contactForm;
// const { get } = require("mongoose");
const User=require("../models/user-model");
const Contact=require("../models/contact-model");
const getAllUsers=async(req,res)=>{
       try{
         const users=await User.find({},{password:0});
         if(!users || users.length===0){
            return res.status(404).json({message:"No users found"});
         }
         return  res.status(200).json(users);
       }catch(error){
        next(error);
       }
};

const getUserById=async(req,res)=>{
    try{
      const id=req.params.id;
      const data=await User.findOne({_id: id},{password:0});
      return res.status(200).json(data);
    }catch(error){
        next(error);
    }
}

const deleteUserById=async(req,res)=>{
    try{
      const id=req.params.id;
      await User.deleteOne({_id: id});
      return res.status(200).json({message:"User Deleted Successfully !"})
    }catch(error){
        next(error);
    }
}


const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
   
  }
};

const updateUserById =async (req,res)=>{
   try{
      const id=req.params.id;
      const UpdatedUserdata=req.body;
      const updateData=await User.updateOne({_id:id},{
        $set:UpdatedUserdata,
      });
      return res.status(200).json(updateData);
   }catch(error){
    next(error);
   }
}
// get all contacts
const getAllContacts=async(req,res)=>{
    try{
        const contacts=await Contact.find({},{password:0});
        if(!contacts || contacts.length===0){
         return res.status(404).json({message:"No contacts found"});
        }
        return res.status(200).json(contacts);
    }catch(error){
        next(error);
    }
};

module.exports= {getAllUsers,getAllContacts,deleteUserById,deleteContactById,getUserById,updateUserById,};
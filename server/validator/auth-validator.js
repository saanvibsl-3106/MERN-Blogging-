const {z}=require("zod");
const loginSchema=z.object({
       email:z.string({required_error:"Email req"}).trim()
      .min(3,{message:"Name must be atleast 3 character"})
      .max(255,{message:"name must be less than 255 characters"}),

     password:z.string({required_error:"password is required"})
    .min(7,{message:"Name must be atleast 7 character"})
    .max(125,{message:"name must be less than 125 characters"}),
});
const SignupSchema=loginSchema.extend({
    username:z
    .string({required_error:"name req"}).trim()
    .min(3,{message:"Name must be atleast 3 character"})
    .max(255,{message:"name must be less than 255 characters"}),

    phone:z.string({required_error:"phone required"}).trim()
    .min(10,{message:"phone number must be atleast 10 digit"})
    .max(10,{message:"phone max of 10 digits"}),
      
});
module.exports={SignupSchema ,loginSchema};
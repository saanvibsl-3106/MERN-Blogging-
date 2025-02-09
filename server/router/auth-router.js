const express=require("express");
const router=express.Router();
const authcontroller=require("../controllers/auth-controller");
const validate=require("../middlewares/validate-middleware");
const {SignupSchema,loginSchema} = require("../validator/auth-validator");

const authMiddleware=require("../middlewares/auth-middleware.js");

// router.get("/", (req,res)=>{
//     res.status(200).send("Server started router successfully ");
// });

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(SignupSchema),authcontroller.register);
router.route("/login").post(validate(loginSchema),authcontroller.login);
router.route('/user').get(authMiddleware,authcontroller.user);
//1st router, then middleware ,then controller 
module.exports=router;
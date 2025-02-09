require('dotenv').config();
const express=require("express");
const app=express();

const servicerouter=require("./router/service-router.js");
const authrouter =require("./router/auth-router.js");
const contactroute=require("./router/contact-router.js");
const connectDB=require("./utlis/db.js");
const adminrouter =require("./router/admin-router.js");
const errorMiddleware = require('./middlewares/error-middleware.js');
const cors=require("cors");

const corOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    Credentials: true,
};

app.use(cors(corOptions));
app.use(express.json());
app.use("/api/auth",authrouter);
app.use("/api/form",contactroute);
app.use("/api/data",servicerouter);
app.use("/api/admin",adminrouter);
app.use(errorMiddleware);

// app.get("/", (req,res)=>{
//     res.status(200).send("Server started successfully ");
// });

const PORT=5001;
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
})

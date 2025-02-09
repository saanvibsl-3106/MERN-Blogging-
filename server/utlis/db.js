const mongoose=require("mongoose");

const URI="mongodb://127.0.0.1:27017/MERN2025";
// const URI= process.env.MONGODB_URI;
// const URI="mongodb+srv://Saanvibsl-06:San@20060131@cluster0.ygv6h.mongodb.net/MERN2025?retryWrites=true&w=majority&appName=Cluster0";

const connectdb = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    }catch(error){
        console.log(error);
        console.error("database connection failed");
        process.exit(0);
    } 
}

module.exports=connectdb;
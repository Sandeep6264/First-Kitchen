const mongoose=require("mongoose");
const config=require("config");
mongoose.connect(`${config.get("MONGODB_URI")}`).then((success)=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("Error")
})
module.exports=mongoose.connection;
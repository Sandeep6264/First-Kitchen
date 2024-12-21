const jwt=require("jsonwebtoken");
const userModel=require("../models/user-models.js")
module.exports.isLoggedIn=async (req,resp,next)=>{
    if(!req.cookies.token){
        resp.status(500).send("Need to login first")
        return;
    }
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decoded.email}).select("-password");
        req.password=user;
       
        next();
       }catch(err){
        resp.send("Need to login")
       }
}
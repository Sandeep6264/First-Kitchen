const express=require("express");
const router=express.Router();
const userModule=require("../models/user-models.js")
router.get("/",(req,resp)=>{
    resp.send("it's working")
})
const {registerUser,loginUser,logoutUser}=require("../controllers/authController.js")
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser);
router.post("/update",async (req,resp)=>{
    const {firstName,email,gender,phone}=req.body;
    try{
        const user=await userModule.findOneAndUpdate({email:email},{name:firstName,email:email,phone:phone,gender:gender})
        console.log(user);
        resp.status(200).send("Fine");
    }catch(err){
        console.log(err.message)
        resp.status(500).send("Internal server error");
    }
})
module.exports=router;
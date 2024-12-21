const express=require("express");
const router=express.Router();
const orderModule=require("../models/order-model.js");
const userModel=require("../models/user-models.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
router.put("/addorder", async (req,resp)=>{
    const arr=req.body;
    const {items,cartNumbers,isLoggedIn}=arr[0]
   
    let allItems=items.map((item)=>{
        return {name:item.name,qty:item.qty};
    })
    let today=new Date();
    let date=today.toLocaleDateString()+","+today.toLocaleTimeString();
    let userName, number, userAddress,userPinCode;
    if(isLoggedIn){
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decoded.email}).select("-password");
        userName=user.name;
        number=user.phone;
        userAddress=user.home;
        userPinCode=user.pincode;
       }catch(err){
        return resp.status(500).send({error:err.message})
       }
    }else{
    const {name,phone,address,pincode}=arr[1];
    userName=name;
    number=phone;
    userAddress=address;
    userPinCode=pincode;
    }
    try{
       let insertUser=await orderModule.create({
            orders:allItems,
            price:cartNumbers.totalAmount,
            customerName:userName,
            placedDate:today.toLocaleDateString(),
            placedTime:today.toLocaleTimeString(),
            phone:number,
            address:userAddress,
            pincode:userPinCode,
        })
        
       return resp.status(201).send({message:"Order Placed succesfully"})
    }catch(err){
        return resp.status(500).send({error:err.message})
    }
})
router.get("/getorder/reject",async (req,resp)=>{
  try{
    let allOrder=await orderModule.find({reject:true}).sort({orderId:-1})
    return resp.status(201).send({status:false,orders:allOrder})
  }catch(err){
    return resp.status(500).send({status:false,error:err.message})
  }
})
router.get("/getorder/accept",async (req,resp)=>{
  try{
    let allOrder=await orderModule.find({accept:true}).sort({orderId:-1})
    return resp.status(201).send({status:false,orders:allOrder})
  }catch(err){
    return resp.status(500).send({status:false,error:err.message})
  }
})
router.get("/getorder/new",async (req,resp)=>{
  try{
    let allOrder=await orderModule.find({reject:false,accept:false})
    return resp.status(201).send({status:false,orders:allOrder})
  }catch(err){
    return resp.status(500).send({status:false,error:err.message})
  }
}
)
router.put("/action/reject",async (req,resp)=>{
   const{id}=req.body;
   try{
    let data=await orderModule.findOneAndUpdate({_id:id},{reject:true},{new:true})
    return resp.status(201).send({status:true,message:"Order Rejected successfully"})
  }catch(err){
    return resp.status(500).send({status:false,message:err.message})
  }
})
router.put("/action/accept",async (req,resp)=>{
  const{id}=req.body;
  try{
    let data=await orderModule.findOneAndUpdate({_id:id},{accept:true},{new:true})
    return resp.status(201).send({status:true,message:"Order Accepted successfully"})
  }catch(err){
  return resp.status(500).send({status:false,message:err.message})
  }
})

module.exports=router;
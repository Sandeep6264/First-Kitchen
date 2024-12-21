const express=require("express");
const router=express.Router();
const itemModule=require("../models/item-models.js")
router.get("/viewitem",async (req,resp)=>{
   try{
    const allitems=await itemModule.find({status:true});
    resp.send({status:"success",error:false,message:allitems})
   }catch(err){
    resp.send({status:"error",error:true,message:err.message})
   }
})
router.post("/create",async (req,resp)=>{
    try{
    const {name,id,img,desc,category,subcategory,price,isHalf,status,halfprice}=req.body;

        if(!name || !img || !desc || !category || !subcategory || !price ||
            !isHalf || !status || !halfprice
        )
        {
            resp.status(400)
            resp.send("Invalid data provided or fields missing.")
            return;
        }

    const createdItem=await itemModule.create({
        name,
        id,
        img,
        desc,
        category,
        subcategory,
        price,
        isHalf,
        status,
        halfprice
    })
    resp.send(createdItem)
}
catch(error)
{
    console.log(error)
}
})
router.get("/get_all_items",async (req,resp)=>{
    try{
        const allitems=await itemModule.find();
        resp.send({status:"success",error:false,message:allitems})
       }catch(err){
        resp.send({status:"error",error:true,message:err.message})
       }
})
router.post("/action/disable",async (req,resp)=>{
    const{id}=req.body;
    try{
        let data=await itemModule.findOneAndUpdate({_id:id},{status:false},{new:true})
       return resp.status(201).send({status:"success",error:false,message:"Item disabled successfully"})
       }catch(err){
        return resp.status(500).send({status:"error",error:true,message:err.message})
       }
})
router.post("/action/delete",async (req,resp)=>{
    try{
        const allitems=await itemModule.findOneAndDelete({_id:id});
       return resp.send({status:"success",error:false,message:"Item deleted successfully"})
       }catch(err){
        return resp.send({status:"error",error:true,message:err.message})
       }
})
router.post("/action/unable",async (req,resp)=>{
    const {id}=req.body;
    try{
        let data=await itemModule.findOneAndUpdate({_id:id},{status:true},{new:true})
    return resp.status(201).send({status:"success",error:false,message:"Item unabled successfully"})
    }catch(err){
     return resp.status(500).send({status:"error",error:true,message:err.message})
    }
})
router.post("/update",async (req,reps)=>{
   const {_id,name,desc,price,halfprice,img,category,subcategory,isHalf}=req.body;
   try{
    const updatedProduct=await itemModule.findOneAndUpdate({_id},{name,desc,price,halfprice,img,category,subcategory,isHalf},{new:true})
   reps.status(201).send({message:"Item updated successfully"})
   }catch(err){
    reps.status(500).send({message:err.message})
   }
})
router.post("/addItem",async (req,reps)=>{
    const {name,desc,price,halfprice,img,category,subcategory,isHalf}=req.body;
    try{
     const insertProduct=await itemModule.create({name,desc,price,halfprice,img,category,subcategory,isHalf})
    reps.status(201).send({success:"Success"})
    }catch(err){
     console.log(err);
     reps.status(500).send({error:err.message})
    }
 })
module.exports=router;
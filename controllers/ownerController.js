var validator = require('validator');
const ownerModel=require("../models/owner-models.js")
const Joi=require("joi")
const bcrypt=require("bcrypt");
const {generateToken}=require("../utils/generateToken.js")
const jwt=require("jsonwebtoken")
module.exports.createOwner=async (req,resp)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(35).required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).max(16).required()
    })
    
    const {username,email,phone,password,gender}=req.body;
    const {error,value}=schema.validate({username,email,password});
    if(error){
        resp.status(500).send({error:error.details[0].message});
        return;
    }
    let flag=validator.isEmail(email);
    if(!flag){
        return resp.status(500).send({error:"Invalid Email"})
    }
    const checkUser= await ownerModel.findOne({email});
    if(checkUser){
           return resp.status(500).send({error:"You have already account please login "});
    }
       bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            try{
                const user= await ownerModel.create({
                    name:username,
                    email,
                    phone,
                   password:hash
                   })
               resp.status(201).send(user)
             
            }catch(err){
                resp.status(500).send(err.message);
                return;
               }
               
        })
       })
   
}
module.exports.loginOwner=async (req,resp)=>{
    let result=validator.isEmail(req.body.email);
    if(!result){
        return resp.status(500).send({error:"Invalid Email"})
    }
    const {email,password}=req.body;
    const user= await ownerModel.findOne({email:email});
    if(!user)
        return resp.status(500).send({error:"Invalid Email / Password"})
    bcrypt.compare(password,user.password,(err,result)=>{

        if(result){
            let token=generateToken(user);
            resp.cookie("token", token); 
           resp.status(201).send({message:"You can login"})
        }else
            return resp.status(500).send({error:"Invalid Email / Password"})
    })
}
module.exports.logoutUser=async(req,resp)=>{
    resp.cookie("token","");
    resp.send("Logout sucessfully")
}
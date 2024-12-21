const express=require("express");
const app=express();
const productModule=require("./modules/product")
const userModule=require("./modules/user");
app.use(express.urlencoded({extended:false}))
const cors=require("cors")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    credentials: true
}));
app.get("/", async (req,resp)=>{
    try{
      const allUser=await productModule.find();
      resp.send({status:"success",error:false,message:allUser})
    }catch(err){
      resp.send({status:"error",error:true,message:[]})
    }   
})
app.post("/login", async (req,resp)=>{
    const{email,password}=req.body
    console.log(req.body)
    const user=await userModule.findOne({email:email});
    if(!user){
      resp.status(500).send({error:"Something went wrong"});
      return;
    }
    bcrypt.compare(password,user.password,(err,result)=>{
      if(result){
          let token= jwt.sign({email:email,userid:user._id},"shhhh")
          resp.cookie("token",token);
          resp.status(201).send({status:true})
      }else
          resp.status(500).send({status:false,error:err})
  })
    
})
app.post("/register", async (req,resp)=>{
  let {userName,email,phone,gender,password,home,pincode}=req.body;
  const user=await userModule.findOne({email:email})
  if(user){
      resp.status(500).send({error:"User already register"});
      return
  }
  bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async (err,hash)=>{
           const createdUser=await userModule.create({
              name:userName,
              email,
              phone,
              home,
              gender,
              pincode,
              password:hash
          })
          let token= jwt.sign({email:email,userid:createdUser._id},"shhhh")
          resp.cookie("token",token);
          resp.status(201).send({user:createdUser})
      })
})
})
  app.listen(3000,()=>{
    console.log(`server started at port 3000`);
})
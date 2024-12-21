const express=require("express");
const { createOwner, loginOwner } = require("../controllers/ownerController");
const router=express.Router();
router.post("/login",loginOwner)
router.post("/create",createOwner)
module.exports=router;
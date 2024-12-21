const mongoose=require("mongoose");
const ownerSchema=mongoose.Schema({
    fullname : {
        type:String,
        minlength:3,
        maxlength:35,
        trim:true,
    },
    email : {
        type:String,
        unique:true,
        required:true,
        trim:true
    } ,
    password :{
        type:String,
        
    },
    products:{
        type:Array,
        default:[],
    },
    phone : Number,
    gender:{
        type:"String",
        default:"Male"
    }
})
module.exports=mongoose.model("owner",ownerSchema);
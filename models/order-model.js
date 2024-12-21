const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const orderSchema=mongoose.Schema({
    orderId:Number,
    orders:{
        type:Object
    },
    price:Number,
    customerName:String,
    placedDate:String,
    placedTime:String,
    phone:Number,
    address:String,
    pincode:Number,
    accept:{
        type:Boolean,
        default:false,
    },
    reject:{
        type:Boolean,
        default:false,
    }
})
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });
module.exports=mongoose.model('order',orderSchema)
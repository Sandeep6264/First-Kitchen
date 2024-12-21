const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:35,
    trim:true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart :{
    type:Array,
    default:[]
    },
    orders : {
        type:Array,
        default:[]
    },
  gender: {
    type: String,
    enum:["male","female","other"],
    required: true
  },
  home: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true,
  },
}, { versionKey: false });  // Disables the "__v" version key

const users = mongoose.model('user', userSchema,"users");
module.exports = users;



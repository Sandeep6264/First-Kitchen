const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:35,
  },
  id: {
    type: Number,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  discount:{
    type:Number,
    default:0,
},
  isHalf: {
    type: Boolean,
    default: false
  },
  halfprice:{
    type:Number
  }
}, { versionKey: false });  // Disables the "__v" version key
menuItemSchema.plugin(AutoIncrement, { inc_field: 'id' });
const MenuItem = mongoose.model('items', menuItemSchema,"item_entities");
module.exports = MenuItem;



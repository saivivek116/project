const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const shortid=require('shortid');
const schema=mongoose.Schema;
let userSchema=new schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  userName:{
    type:String,
    unique:true,
    required:true
  },
  email: {type:String,
    // unique:true
  },
  password:{
    type:String,
    required:true
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  work:String,
  branch:String,
  bookmarks:{
    type:Array
  },
  bio:String,
  joined:String
  // work:String,
  // branch:String,
});
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);
const mongoose = require('mongoose');
const shortid = require('shortid');
// var uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;
let otpSchema=new schema({
  otp:{type:String},
  email:{type:String}
})
// otpSchema.plugin(uniqueValidator);
module.exports = mongoose.model('otp', otpSchema);
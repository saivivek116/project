const mongoose = require('mongoose');
const schema = mongoose.Schema;
const shortid = require('shortid');
const commentSchema=new schema({
  comment:String,
  commentId:String,
  blogId:String,
  author:String,
  commentDate:String
});
module.exports = mongoose.model('comment', commentSchema);

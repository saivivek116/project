const comment = require('../models/comment');
const User=require('../models/model');
const shortid = require('shortid');
const express = require('express')
const mongoose = require('mongoose');
const time = require('./../libs/timelib');
const mail=require('../mail');
exports.getComments=function(req,res){
  let blogId=req.params.blogId;
  comment.find({blogId:blogId},(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
    }
    else if (result == undefined || result == null || result == ''){
      console.log('No comment Found');
      res.send("No comment Found");
    }
    else{
      res.send(result);
    }
  })
}
exports.createComment=function(req,res) {
  let today = time.getLocalTime();
  let newcomment=new comment({
    comment:req.body.comment,
    commentId: shortid.generate(),
    blogId:req.body.blogId,
    author:req.body.username,
    commentDate:today
  });
  newcomment.save((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);

    }
  })
  User.findOne({_id:req.body.userId},function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    else if(user == undefined || user == null || user == ''){
      console.log("No user Found")
      res.send("No email Found");
    }
    else{
      mail.postCommented(req.body.username,user.email,req.body.blogTitle);
      //res.send({"result":"succesful"});
    }
    
  })
 
}
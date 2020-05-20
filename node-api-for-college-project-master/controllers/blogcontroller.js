const BlogModel=require('../models/blogs'); 
const User = require('../models/model');
const shortid = require('shortid');
const express = require('express')
const mongoose = require('mongoose');
const time = require('./../libs/timelib');
exports.getAllBlogs=(req,res)=>{
  BlogModel.find()
  .select('-__v -_id')
  .lean()
  .exec((err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result)
    }
  })
}

exports.viewByBlogId = (req, res) => {
  
  BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
    
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result)
      
    }
  })
}
exports.viewByCategory = (req, res) => {
  
  BlogModel.find({ 'category': req.params.category }, (err, result) => {
    
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result)
      
    }
  })
}
exports.viewByAuthor = (req, res) => {
  
  BlogModel.find({ 'author': req.params.author }, (err, result) => {
    
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found');
      res.send({"result":"No blogs found"});
    } else {
      res.send(result)
      
    }
  })
}

exports.editBlog = (req, res) => {
  
  let options = req.body;
  console.log(options);
  BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {
    
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result)
      
    }
  })
}

exports.deleteBlog = (req, res) => {
  
  BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      res.send("No Blog Found")
    } else {
      res.send(result)
      
    }
  })
}
exports.createBlog = (req, res) => {
  // var today = Date.now()
  let today=time.getLocalTime();
  let blogId = shortid.generate();
  
  let newBlog = new BlogModel({
    
    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    blogBody: req.body.blogBody,
    isPublished: true,
    branch:req.body.branch,
    // category: req.body.category,
    tags:req.body.tags,
    author: req.body.username,
    created: today,
    lastModified: today,
    userId: req.body._id
  }) // end new blog model
  
  let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
  newBlog.tags = tags
  
  newBlog.save((err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.send(result)
      
    }
  }) // end new blog save
}
exports.userBlogs=function(req,res){
  let _id=req.params._id;
  console.log(req.params._id);
  BlogModel.find({userId:_id},function(err,result){
    console.log(result);
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    else if (result == undefined || result == null || result == ''){
      console.log("no blogs found");
      return res.send("no blogs found");
    }
    res.send(result);
  })
  
}
exports.bookmarkedBlogs=function(req,res) {
  let userId=req.params.userId;
  let bookmarksArray=[];
  let userobj;
  let obj=[];
  console.log(userId);
  User.find({ _id: userId }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    else{
      // console.log(user,"a");
      userobj=user
      // console.log(userobj, "b");
      bookmarksArray = user[0].bookmarks;
      console.log(bookmarksArray);
      console.log(bookmarksArray[0]);
      for (let b of bookmarksArray) {
        BlogModel.findOne({ 'blogId': b }, (err, result) => {

          if (err) {
            console.log(err)
            res.send(err)
          } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
          } else {
            obj.push(result);
            console.log(obj);
            // res.send(result)
          }
        })
      }
      // obj=getB(res, bookmarksArray);
      // console.log(obj);
      res.setTimeout(1000, function () {
        console.log('Request has timed out.');
        res.send(obj);
      });
      
    }
  })
}

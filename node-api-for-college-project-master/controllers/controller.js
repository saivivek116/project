const User=require('../models/model');
const Otp=require('../models/otp');
const shortid = require('shortid');
const mail=require('../mail')
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const time = require('./../libs/timelib');
var uniqueValidator = require('mongoose-unique-validator');
const BlogModel=require('../models/blogs'); 
exports.register=function(req, res, next){
  console.log(req.body);
  let today=time.getLocalTime();
  let password=req.body.password;
  let hashedpassword;
  bcrypt.genSalt(5, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) { console.log(err); }
      hashedpassword = hash;
      console.log(password,hashedpassword); 
    });
  });
  let user=new User({
    _id: shortid.generate(),
    userName:req.body.userName,
    email:req.body.email,
    password: password,
    work:req.body.gridRadios,
    branch:req.body.branch,
    // work:req.body.type,
    // branch:req.body.branch
    bio:req.body.bio,
    joined:today
    
  });
  user.save((err,result)=>{
    if(err){
      console.log("error");
      console.log(err);
      res.status(404).send({error:"there is an error in database"});
    }
    else{
      console.log(result);
      res.send(result);
    }
  });
}
exports.login=function(req,res,next){
  let uname=req.body.userName;
  let password=req.body.password;
  
  User.findOne({userName:uname,password:password,isVerified:true},function(err, user){
    console.log(user);
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    else if(!user)
    {
      return res.status(404).send('username or password is incorrect');
    }
    
    // bcrypt.compare(password, user.password, function (err, result) {
    //   // result == true
    //   console.log(result);
    //   if(result==true){
    //     console.log("successful");
    //     console.log(result);
    //   }
    //   else{
    //     console.log("Password is incorrect");
    //     return res.status(500).send('password is incorrect');
    //   }
    // });
    return res.status(200).send('login successful');
  
  }) 
}
exports.profile=function(req,res){
  let username=req.params.id;
  console.log("profile called",username);
  User.findOne({userName:username},function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(user);
    return res.send(user);
  })

}
exports.forgetPassword=function(req,res){
  let toemail=req.body.email;
  console.log("profile called",toemail);
  User.findOne({email:toemail},function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    else if(user == undefined || user == null || user == ''){
      console.log("No email Found")
      res.send("No email Found");
    }
    else{
      mail.forgetpass(toemail,user.password);
      res.send({"result":"succesful"});
    }
    
  })

}
exports.updateProfile=function(req,res){
  let profile = req.body;
  console.log(profile);
  User.update({ '_id': profile._id }, profile, { multi: true }).exec((err, result) => {

    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No User found')
      res.send("No User found")
    } else {
      res.send(result)

    }
  })
}
exports.getotp=function(req,res){
  let email=req.body.email;
  let otp=shortid.generate();
  let newotp = new Otp({
    email:email,
    otp:otp
  });
  newotp.save((err, result) => {
    if (err) {
      console.log("error");
      console.log(err);
      res.status(404).send({ error: "there is an error in database" });
    }
    else {
      console.log(result);
      mail.mailfunction(email,otp);
      res.send(result);
    }
  });
}
exports.verifyotp=function(req,res){
  let otp=req.body.otp;
  let email=req.body.email;
  console.log(otp,email);
  Otp.findOne({otp:otp},(err,result)=>{
    if(err){
      console.log(err);
    }
    else if (result == undefined || result == null || result == '') {
      console.log('No otp found')
      res.send("No otp found")
    } else {
      res.send(result);
      Otp.remove({ otp: otp }, function (err) {
        if (!err) {
         console.log("successfully deleted");
        }
        else {
          // message.type = 'error';
          console.log(err);
        }
      });

    }
  });
  // query={email:email};
  // valueUpdate = { $set: { isVerified: true } };
  User.update({ email: email },{isVerified:true}, { multi: true }).exec((err, result) => {

    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No User found')
      res.send("No User found")
    } else {console.log(result);
      // res.send(result)

    }
  })
}
exports.addToBookmarks = function (req, res) {
  let blogId = req.body.blogId;
  let email=req.body.email;
  console.log(blogId,email);
  User.update({ email: email }, { $push: { bookmarks: blogId } }, { multi: true }).exec((err, result) => {

    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No User found')
      res.send("No User found")
    } else {
      console.log(result,"added");
      res.send(result)

    }
  })

}
exports.getAllUsers=function(req, res){
  User.find()
  .select('-__v -_id')
  .lean()
  .exec((err, result) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No User Found')
      res.send("No User Found")
    } else {
      res.send(result)
//dont send password

    }
  })
}
exports.deleteUser = (req, res) => {
  username=req.params.username;
  console.log(username);
  User.remove({ 'userName': username }, (err, result) => {
    
    if (err) {
      console.log(err)
      res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No User Found')
      res.send("No User Found")
    } else {
      console.log(result);
      res.send(result)
      
    }
  });
  BlogModel.remove({ 'author': username }, (err, result) => {
    if (err) {
      console.log(err)
      // res.send(err)
    } else if (result == undefined || result == null || result == '') {
      console.log('No Blog Found')
      // res.send("No Blog Found")
    } else {
      // res.send(result)
      
    }
  });
}
exports.deleteBookmark=function(req,res){
  
  let book=req.body;
  console.log(book.username);
  User.update({userName:book.username},
    { $pull: { bookmarks: { $in: [ book.blogId ] } } },
    { multi: true }
    ).exec((err, result) => {

      if (err) {
        console.log(err)
        res.send(err)
      } else if (result == undefined || result == null || result == '') {
        console.log('No User found')
        res.send("No User found")
      } else {
        console.log(result,"deleted");
        res.send(result)
  
      }
    });
}
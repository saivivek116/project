let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jntuhcesblog@gmail.com',
    pass: 'cse594955'
  }
});
exports.mailfunction=function(toemail,otp){
let mailOptions = {
  from: 'jntuhcesblog@gmail.com',
  to: toemail,
  subject: 'OTP from jntuhcesblog website',
  text:"This is an otp for verifying you email "+otp 
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
exports.forgetpass=function(toemail,password){
  let mailOptions = {
    from: 'jntuhcesblog@gmail.com',
    to: toemail,
    subject: 'Message from jntuhcesblog website',
    text:"Do not share your password with anyone "+ password
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
exports.postCommented=function(username,email,blogTitle){
  let mailOptions = {
    from: 'jntuhcesblog@gmail.com',
    to: email,
    subject: 'Message from jntuhcesblog website',
    text:`${username} posted comment on your blog ${blogTitle} \n To view the comment login to the website http://localhost:3000`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

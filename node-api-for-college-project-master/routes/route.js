const express=require('express');
const router=express.Router();
const controller=require('../controllers/controller');

const cors=require('cors');
//login and register routes
router.post('/register',cors(),controller.register);
router.post('/login',cors(),controller.login);
router.get('/profile/:id',cors(),controller.profile);
router.put('/updateProfile',cors(),controller.updateProfile);
router.post('/getotp',cors(),controller.getotp);
router.post('/verifyotp',cors(),controller.verifyotp);
router.post('/addToBookmarks',cors(), controller.addToBookmarks);
router.get('/allUsers',cors(),controller.getAllUsers);
router.post('/forgetPassword',cors(),controller.forgetPassword);
router.post('/deleteUser/:username',cors(),controller.deleteUser);
// router.get()
module.exports=router;
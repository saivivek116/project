const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const cors = require('cors');
router.get('/getComments/:blogId',commentController.getComments);
router.post('/createComment',commentController.createComment);

module.exports=router;
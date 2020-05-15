const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogcontroller');
const cors = require('cors');
router.get( '/all', blogController.getAllBlogs);

router.get( '/view/:blogId', blogController.viewByBlogId);

router.get( '/view/by/author/:author', blogController.viewByAuthor);

router.get( '/view/by/category/:category', blogController.viewByCategory);
router.get('/userBlogs/:_id', cors(), blogController.userBlogs);

router.post( '/:blogId/delete', blogController.deleteBlog);

router.put( '/:blogId/edit', blogController.editBlog);

router.post( '/create', blogController.createBlog);
// router.post('/addToBookmarks',blogController.addToBookmarks);
router.get('/bookmarkedposts/:userId', blogController.bookmarkedBlogs);
// router.get( '/:blogId/count/view', blogController.increaseBlogView);
module.exports=router;
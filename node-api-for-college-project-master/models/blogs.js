const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let blogSchema = new Schema(
  {
    blogId: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    blogBody: {
      type: String,
      default: ''
    },
    // views: {
    //   type: Number,
    //   default: 0
    // },
    isPublished: {
      type: Boolean,
      default: false
    },
    branch: {
      type: String,
      default: ''
    },
    // category: {
    //   type: String,
    //   default: ''
    // },
    author: {
      type: String,
      default: ''
    },
    tags: [],

    created: {
      type: String,
    },
    userId:String,
    lastModified: {
      type: String,
      // default: Date.now
    }
  }
)

module.exports=mongoose.model('Blog', blogSchema);
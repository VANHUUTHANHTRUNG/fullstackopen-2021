const commentRouter = require('express').Router()
const middleware = require('../utils/middleware')
const mongoose = require('mongoose')

const BlogModel = require('../models/blog')
const CommentModel = require('../models/comment')

commentRouter.get('/:id/comments', async (req, res) => {
  const commentBlogs = await BlogModel.findById(req.params.id).populate(
    'comments'
  )
  console.log(commentBlogs)
  res.json(commentBlogs)
})

commentRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (req, res) => {
    const { body, user } = req
    const blog = await BlogModel.findById(req.params.id).populate('comments')
    const newComment = new CommentModel({
      content: body.content,
      blog: blog._id.toString(),
      user: user._id.toString(),
    })
    try {
      const savedComment = await newComment.save()
      blog.comments = blog.comments.concat(savedComment._id)
      await blog.save()
      const updatedBlog = await BlogModel.findById(req.params.id)
        .populate('user', {
          username: 1,
          name: 1,
        })
        .populate('comments')
      res.status(201).json(updatedBlog.toJSON()).end()
    } catch (error) {
      return res.status(400).json({ error: error }).end()
    }
  }
)

module.exports = commentRouter
// check post comment with postman

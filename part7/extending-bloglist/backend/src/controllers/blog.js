const _ = require('lodash')
const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()

const BlogModel = require('../models/blog')
const UserModel = require('../models/user')
const helper = require('../tests/test_helper')
const middleware = require('../utils/middleware')
const logger = require('../utils/logger')
const user = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await BlogModel.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments')
  res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await BlogModel.findById(req.params.id)
  if (blog) return res.json(blog)
  return res.status(404).end()
})

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const chosenUser = req.user
  if (!req.token) return res.status(401).end()
  const newBlog = new BlogModel({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes !== undefined ? body.likes : 0,
    user: chosenUser._id,
  })
  try {
    const savedBlog = await newBlog.save()
    chosenUser.blogs = chosenUser.blogs.concat(savedBlog._id)
    await chosenUser.save()
    return res.status(201).json(savedBlog)
  } catch (error) {
    // logger.error(error)
    return res.status(400).json({ error: error._message }).end()
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blogToDelete = await BlogModel.findById(req.params.id)
  if (!blogToDelete)
    return res.status(404).json({ error: 'blog to delete not found' }).end()

  const userFromToken = req.user
  if (userFromToken._id.toString() !== blogToDelete.user.toString()) {
    return res
      .status(403)
      .json(new Error({ message: 'no creator right to delete this blog' }))
      .end()
  }

  const deletedBlog = await BlogModel.findByIdAndRemove(req.params.id)
  if (deletedBlog) return res.status(204).end()
})

blogRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const onlyLikeAdded = (newBlog, blogToUpdate) => {
    const { likes: newBlogLikes, comments: commentsNewBlog } = newBlog
    const { likes: blogToUpdateLikes, comments: commentsBlogToUpdate } =
      JSON.parse(JSON.stringify(blogToUpdate.toJSON()))
    return (
      newBlogLikes === blogToUpdateLikes + 1 &&
      commentsNewBlog.length === commentsBlogToUpdate.length
    )
  }

  const userFromToken = req.user
  const newBlog = req.body
  const blogToUpdate = await BlogModel.findById(req.params.id)
  if (!blogToUpdate) return res.status(404).end()

  if (onlyLikeAdded(newBlog, blogToUpdate)) {
    const body = {
      ...newBlog,
      comments: newBlog.comments.map((comment) => comment.id),
    }
    const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, body, {
      new: true,
    })
      .populate('user')
      .populate('comments')
    if (updatedBlog) {
      return res.status(200).json(updatedBlog.toJSON()).end()
    }
  }

  if (userFromToken._id.toString() !== blogToUpdate.user.toString()) {
    return res.status(403).json('no creator right to update')
  }
  const updatedBlog = await BlogModel.findByIdAndUpdate(
    req.params.id,
    newBlog,
    { new: true }
  )
  if (updatedBlog) {
    return res.status(200).end()
  }
})

module.exports = blogRouter

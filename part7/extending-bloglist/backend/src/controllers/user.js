const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const UserModel = require('../models/user')
const logger = require('../utils/logger')

userRouter.get('/', async (_req, res) => {
  const users = await UserModel.find({}).populate('blogs', {
    url: 1,
    title: 1,
  })
  return res.json(users.map((user) => user.toJSON())).end()
})

userRouter.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  if (user) return res.status(200).json(user)
  return res.status(404).end()
})

userRouter.post('/', async (req, res) => {
  const body = req.body
  if (body.password.length < 4)
    return res.status(400).json({
      message: '`password` is shorter than the minimum allowed length',
    })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const newUser = new UserModel({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  try {
    const savedUser = await newUser.save()
    return res.status(201).json(savedUser).end()
  } catch (error) {
    return res.status(400).json(error).end()
  }
})

module.exports = userRouter

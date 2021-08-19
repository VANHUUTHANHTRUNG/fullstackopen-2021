const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const HARDCODED_PASS = process.env.HARDCODED_PASS
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  HARDCODED_PASS,
  JWT_SECRET,
}

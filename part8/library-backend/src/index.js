const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const {
  MONGODB_URI: url,
  HARDCODED_PASS,
  JWT_SECRET,
} = require('./utils/config')

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((error) => console.log('Failed to connect to db: ', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (args.author && args.genre)
        return await Book.find({
          $and: [
            {
              author: {
                $eq: (await Author.findOne({ name: args.author })).id,
              },
            },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')

      if (args.author)
        return await Book.find({
          author: {
            $eq: (await Author.findOne({ name: args.author })).id,
          },
        }).populate('author')

      if (args.genre)
        return await Book.find({
          genres: { $in: args.genre },
        }).populate('author')
      else return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      let authorsBooksCounted = await Promise.all(
        authors.map(async (author) => {
          const booksCounted = await Book.find({
            author: { $eq: author.id },
          })
          return {
            name: author.name,
            born: author.born,
            id: author.id,
            bookCount: booksCounted.length,
          }
        })
      )
      return authorsBooksCounted
    },
    me: async (_root, _args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    createUser: async (_root, args) => {
      try {
        const user = new User({ ...args })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== HARDCODED_PASS) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated !!!!!')
      let newBook
      let author = await Author.findOne({ name: args.author })
      let bookFound = await Book.findOne({ title: args.title })
      try {
        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
          })
          await author.save()
        }
        if (bookFound) return
        newBook = new Book({ ...args, author: author._id })
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated !!!!!')
      let author = await Author.findOne({ name: args.name })
      if (!author) return
      author.born = args.setBornTo
      author.bookCount = await Book.countDocuments({
        author: { $eq: author.id },
      })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

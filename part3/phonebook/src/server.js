require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/Person")

const PORT = process.env.PORT || 3001
const app = express()

const unknownEndpoint = (_req, res) =>
  res.status(404).send({ error: "Unknown endpoint" })

const errorHandler = (error, _req, res, next) => {
  console.log(error.name)
  console.log(error.message)

  if (error.name === "CastError") {
    return res
      .status(400)
      .json({ error: "Malformatted id: Record with ID does not exist." })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

morgan.token("post-param", (req) => {
  const body = req.body
  if (req.method === "POST") {
    return JSON.stringify(body)
  }
  return ""
})

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-param"
  )
)

app.get("/info", (_req, res) => {
  Person.find({}).then((persons) => {
    let content = ""
    content += `<p>Phone has info of ${persons.length} people</p>`
    content += `<p>${new Date().toString()}</p>`
    res.end(content)
  })
})

app.get("/api/persons", (_req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(201).json(person)
      } else {
        res.status(404).send().end()
      }
    })
    .catch((error) => next(error))
})

app.post("/api/persons/", (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number)
    return res.status(400).json({ error: "Name or number missing" })

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body
  const person = new Person({
    _id: req.params.id,
    name: body.name,
    number: body.number
  })
  Person.findByIdAndUpdate({ _id: req.params.id }, person, { new: true })
    .then((updatePerson) => res.status(204).json(updatePerson))
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) res.status(204).json(result).end()
      else res.status(404).end()
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

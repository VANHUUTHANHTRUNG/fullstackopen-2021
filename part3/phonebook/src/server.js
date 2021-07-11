const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const generateID = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const unknownEndpoint = (_req, res) =>
    res.status(404).send({ error: "Unknown endpoint" });

morgan.token("post-param", (req, _res) => {
    const body = req.body;
    if (req.method === "POST") {
        return JSON.stringify(body);
    }
    return "";
});

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :post-param"
    )
);

app.get("/info", (_req, res) => {
    let content = "";
    content += `<p>Phone has info of ${persons.length} people</p>`;
    content += `<p>${new Date().toString()}</p>`;
    res.end(content);
});

app.get("/api/persons", (_req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const foundPerson = persons.find((person) => person.id === id);
    if (foundPerson !== undefined) res.json(foundPerson);
    else res.status(404).end();
});

app.post("/api/persons/", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number)
        return res.status(400).json({ error: "Name or number missing" });
    const id = generateID(1, 1000);
    sameIdPerson = persons.find((person) => person.id === id);
    if (sameIdPerson !== undefined)
        return res
            .status(400)
            .json({ erorr: `generated ID: ${id} has been taken, try again` });
    sameNamePerson = persons.find((person) => person.name === body.name);
    if (sameNamePerson !== undefined)
        return res.status(400).json({
            error: `name must be unique, ${body.name} is already in phonebook`,
        });
    persons = [...persons, { id: id, name: body.name, number: body.number }];
    res.status(201).end(`Successfully added ${body.name}`);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const foundPerson = persons.find((person) => person.id === id);
    if (foundPerson !== undefined) {
        persons = persons.filter((person) => person.id !== id);
        res.end(`Deleted ${foundPerson.name} from phonebook`);
    } else res.status(404).end("Can not find person to delete");
});

app.use(unknownEndpoint);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

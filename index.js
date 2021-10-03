const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())

//define body field to show what data we are posting
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))


const PORT = 3001

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  //const maxId = Math.max(...persons.map(persons => persons.id))
  const randNum = Math.floor(Math.random() * 100000)
  return randNum;
}

app.get("/", (request, response) => {
  response.send("<h1 style='color:red'>Say hello</h1>")
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)

  } else {
    response.status(404).end()
  }
})

app.get("/info", (request, response) => {
  const currDate = new Date();
  const msg = `Phonebook has info for ${persons.length} people. </br></br>
${currDate}`;
  response.send(msg)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    persons = persons.filter(person => person.id !== id)
    response.status(200).end()
  }
  else {
    response.status(400).json({ error: "Invalid user" })
  }
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Bad request, missing info" })
  }
  const nameChecker = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase() ? true : false)

  if (nameChecker) {
    return response.status(400).json({ error: "Name must be unique" })
  }
  const personObj = {
    "id": generateId(),
    "name": body.name,
    "number": body.number
  }
  persons = persons.concat(personObj)
  response.status(201).json(personObj)
})

app.listen(PORT, () => {
  console.log("Server running")
})
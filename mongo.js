const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Enter your password for mongo")
}

const password = process.argv[2]

console.log(password)
const url = `
mongodb+srv://fullstack:${password}@cluster.vvhhy.mongodb.net/Cluster?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Insan = mongoose.model("hayvan", personSchema)

const person = new Insan({
  id: 1000,
  name: "sCan",
  number: "5362001555"
})

person.save().then(result => {
  console.log("person saved")
  mongoose.connection.close()
})

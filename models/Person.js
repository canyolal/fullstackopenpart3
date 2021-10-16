const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
require("dotenv").config()

const url = process.env.MONGODB_URI
console.log("connecting to", url)

mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Mongo connection failed", error.message)
  })

const personSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    require: true,
    minLength: 8
  }
}, { versionKey: false })

personSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model("Person", personSchema)
const mongoose = require("mongoose")

const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/myFirstDatabase"

mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB.")
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })

const db = mongoose.connection.on("error", () => console.log("Error"))

module.exports = db

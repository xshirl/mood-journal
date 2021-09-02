const bcrypt = require("bcrypt")
const db = require("../db")
const User = require("../models/user")
const Journal = require("../models/journal")
const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/myFirstDatabase"

const MongoClient = require("mongodb").MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true })
client
  .connect()
  .then(() => {
    console.log("Successfully connected to MongoDB.")
    run()
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })

const SALT_ROUNDS = 11

const createSeedData = async () => {
  await User.deleteMany()
  await Journal.deleteMany()

  const users = [
    new User({
      username: "xshirl",
      name: "Shirley Xu",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
    }),
  ]
  for (let user of users) {
    user.save(function (err, result) {
      if (err) {
        console.log(err)
        return
      }
    })
  }
  console.log("Successfully created users!")

  const journals = [
    new Journal({
      title: "A New Beginning",
      content:
        "I now know myself. And I will hold on to my identity and never let it go.",
      date: new Date(),
      author: users[0]["_id"],
    }),
  ]
  for (let journal of journals) {
    journal.save(function (err, result) {
      if (err) {
        console.log(err)
        return
      }
    })
  }
  console.log("Successfully created journals!")
}
const run = async () => {
  try {
    await createSeedData()
    db.close()
  } catch (error) {
    console.log(error)
  }
}

run()

const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Journal = require("../models/journal")
const Mongoose = require("mongoose")
const ObjectId = require("mongodb").ObjectID
const { inRange } = require("lodash")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

db.on("error", console.error.bind(console, "MongoDB connection error:"))

const SALT_ROUNDS = 11
const TOKEN_KEY = process.env.TOKEN_KEY

// Helper functions
// given a req, determine the user_ID from the token. this lets us know which user based on their token has tried to access a route
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)

    if (legit) {
      return legit
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

// USERS - Auth
const signUp = async (req, res) => {
  try {
    console.log(req.body)
    const { username, name, password, admin_key } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      name,
      password_digest,
    })
    await user.save()

    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    return res.status(201).json({ user: payload, token })
  } catch (error) {
    console.log("Error in signUp")
    return res.status(400).json({ error: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        name: user.name,
      }
      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json({ user: payload, token })
    } else {
      res.status(401).send("Invalid Credentials")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//verify user
const verifyUser = async (req, res) => {
  try {
    // can only verify with JWT
    const legit = await userOfRequest(req)

    if (legit) {
      const user = await User.findById(legit.id)

      const profile = {
        id: user._id,
        username: user.username,
        name: user.name,
      }

      return res.status(200).json({ user: profile })
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//get journal entries

const getJournals = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const journal = await Journal.find({
        author: legit.id,
      })
      return res.status(200).json({
        journal,
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// get one journal

const getJournal = async (req, res) => {
  try {
    const { id } = req.params
    const journal = await Journal.findById(id)
    return res.status(200).json(journal)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// create journal

const createJournal = async (res, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const data = req.body
      data.author = legit.id
      const journal = await new Journal(data)
      await journal.save()
      return res.status(200).json(journal)
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// edit journal

const editJournal = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const journal = await Journal.findById(req.params.id)
      if (legit.id != journal.author.toString()) {
        return res.status(401).send("Not Authorized")
      }
      const data = req.body
      await Event.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true },
        (error, event) => {
          if (error) {
            return res.status(500).json({ error: error.message })
          }
          if (!journal) {
            return res.status(404).json({ message: "Journal Not Found" })
          }
          return res.status(200).json(journal)
        }
      )
    } else {
      return res.status(401).send("Not Authorized")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// delete journal

const deleteJournal = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const journal = await Journal.findById(req.params.id)
      if (!journal) {
        return res.status(401).send("No Journal Found")
      }
      if (legit.id != journal.author.toString()) {
        return res.status(401).send("Not Authorized")
      }
      const deletion = await Journal.findByIdAndDelete(req.params.id)
      return res.status(200).json(deletion)
    }

    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signIn,
  signUp,
  verifyUser,
  getJournal,
  getJournals,
  editJournal,
  createJournal,
  deleteJournal,
}

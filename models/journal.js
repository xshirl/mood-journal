const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Journal = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("journals", Journal)

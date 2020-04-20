const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "no-name",
  },
  email: {
    type: String,
  },
  hireable: {
    type: Boolean,
  },
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    createIndexes: "2dsphere",
  },
  //campos adicionados abaixo
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  plan: {
    type: String,
    default: "basic-free",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Dev", DevSchema);

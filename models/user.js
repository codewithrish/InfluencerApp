const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  metaId: {
    type: String,
    required: true,
  },
  niche: {
    type: Schema.Types.ObjectId,
    ref: "Niche",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  gender: {
    type: String
  },
  birthDate: {
    type: Date
  },
  noOfFollowers: {
    type: Number
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  contract: [{
    type: Schema.Types.ObjectId,
    ref: 'Contract'
  }]
});

module.exports = mongoose.model("User", userSchema);

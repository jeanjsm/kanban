const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: String,
  order: Number,
  locked: Boolean,
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("List", ListSchema);

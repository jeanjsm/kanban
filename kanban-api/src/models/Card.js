const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: String,
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  label: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user_active: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Card', CardSchema);
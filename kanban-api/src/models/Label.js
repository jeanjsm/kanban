const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  name: String,
  color: String
});

module.exports = mongoose.model('Label', LabelSchema);
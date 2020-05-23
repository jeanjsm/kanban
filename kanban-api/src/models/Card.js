const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    label: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueAt: Date
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);

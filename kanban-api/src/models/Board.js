const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: String,
    private: Boolean,
    favorite: Boolean,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", BoardSchema);

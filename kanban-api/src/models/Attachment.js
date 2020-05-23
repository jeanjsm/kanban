const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const AttachmentSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AttachmentSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

AttachmentSchema.pre("remove", function () {
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
  );
});

module.exports = mongoose.model("Attachment", AttachmentSchema);

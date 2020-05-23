const axios = require("axios");
const Card = require("../models/Card");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  async index(request, response) {
    const { card_id } = request.params;

    const card = await Card.findById(card_id);

    if (!card) {
      return response.status(400).json({ error: "Card does not exists" });
    }

    const comments = await Comment.find({ card: card_id });
    Comment.find({ card: card_id }).populate({
      path: 'user'
    }).exec(function(err, comments) {
      if (err) return response.status(400).json({ error: 'Error to load comments' });
      return response.json(comments);
    });
  },

  async store(request, response) {
    const { user_id } = request.headers;
    const { text } = request.body;
    const { card_id } = request.params;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: "User does not exists" });
    }

    const card = await Card.findById(card_id);

    if (!card) {
      return response.status(400).json({ error: "Card does not exists" });
    }

    const comment = await Comment.create({ text, card: card_id, user: user_id });
    return response.json(comment);
  },

  async update(request, response) {
    const newComment = request.body;
    await Comment.findByIdAndUpdate(newComment._id, newComment, function (err, doc) {
      if (err)
        return response
          .status(500)
          .json({ error: "Error updating " + newComment.title });
      return response.json({ message: "Succesfully saved." });
    });
  },

  async delete(request, response) {
    const { comment_id } = request.params;
    await Comment.findByIdAndDelete(comment_id, function (err, doc) {
      if (err)
        return response.status(500).json({ error: "Error removing " + id });
      return response.json({ message: "Succesfully saved." });
    });
  },
};

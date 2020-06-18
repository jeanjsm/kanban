const axios = require("axios");
const Board = require("../models/Board");
const User = require("../models/User");

module.exports = {
  async findById(request, response) {
    Board.findById(request.params.board_id, function (err, board) {
      if (err) {
        return response.status(400).json({ error: "Board not found" });
      }
      return response.json(board);
    });
  },
  async index(request, response) {
    const { user_id } = request.headers;
    const boards = await Board.find({ owner: user_id });
    return response.json(boards);
  },

  async store(request, response) {
    try {
      const { user_id } = request.headers;
      const { title, private } = request.body;

      const user = await User.findById(user_id);

      if (!user) {
        return response.status(400).json({ error: "User does not exists" });
      }

      let board = await Board.create({ owner: user_id, title, private });
      return response.json(board);
    } catch (err) {
      return response.status(400).json({ error: err });
    }
  },

  async addMember(request, response) {
    const { id, id_member } = request.body;
    const board = await Board.findById(id);

    if (!board) {
      return response.status(400).json({ error: 'Board not found!' });
    }

    const user = User.findById(id_member);

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    board.members.push(id_member);
    board.save();
  }
};

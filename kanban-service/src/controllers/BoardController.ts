import { Request, Response } from "express";
import knex from "../database/connection";
import Board from "../models/Board";
import { request } from "http";

class BoardController {
  async index(request: Request, response: Response) {
    const { user_id } = request.headers;
    const boards = await knex("board")
      .join("user_board", "board._id", "=", "user_board.board_id")
      .where("user_board.user_id", Number(user_id))
      .select("board.*");
    return response.json(boards);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.headers;
    const { title, privateboard } = request.body;

    const trx = await knex.transaction();

    const user = await knex("user").where("_id", Number(user_id));
    if (!user || user.length == 0) {
      return response.status(400).send({ error: "User does not exists!" });
    }

    const insertedId = await trx("board").returning("_id").insert({
      title,
      private: privateboard,
    });
    const boardId = insertedId[0];
    let board: Board = await trx("board").where("_id", boardId).first();

    await trx("user_board").insert({
      user_id,
      board_id: board._id,
      owner: true,
    });

    board.owner = true;
    trx.commit();

    return response.json(board);
  }

  async findById(request: Request, response: Response) {
    const { board_id } = request.params;

    const board = await knex("board").where("_id", Number(board_id)).first();

    if (!board) return response.status(400).send({ error: "Board not found" });

    return response.send(board);
  }

  async loadMembers(request: Request, response: Response) {
    const { board_id } = request.params;

    const board = await knex("board").where("_id", Number(board_id)).first();

    if (!board) return response.status(400).send({ error: "Board not found" });

    const users = await knex.select('user._id', 'user.name', 'user.email', 'user_board.owner').from('user').join('user_board', 'user._id', '=', 'user_board.user_id').where('user_board.board_id', board_id);
    return response.json(users);
  }

  async addMember(request: Request, response: Response) {
    const { board_id } = request.params;
    const { id_member } = request.body;

    const board = await knex("board").where("_id", Number(board_id)).first();

    if (!board) return response.status(400).send({ error: "Board not found" });

    const user = await knex
      .select("*")
      .from("user")
      .where("_id", Number(id_member))
      .first();

    if (!user) return response.status(400).send({ error: "User not found" });

    await knex("user_board").insert({
      user_id: id_member,
      board_id: id,
      owner: false,
    });

    return response.json({ message: 'Successfully added' })
  }
}


export default BoardController;

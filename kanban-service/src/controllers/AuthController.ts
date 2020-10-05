import { Request, Response } from "express";
import knex from "../database/connection";
import Auth from "../utils/auth";
import User from "../models/User";
import bcrypt from "bcrypt";

class AuthController {
  async register(request: Request, response: Response) {
    try {
      const { name, username, email, password } = request.body;

      let users = await knex("user").where("email", email);

      if (users.length > 0) {
        return response.status(400).send({ error: "User already exists" });
      }

      const insertedId = await knex("user").returning("_id").insert({
        name,
        username,
        email,
      });

      const userId = insertedId[0];

      const hash = await bcrypt.hash(userId + password, 10);
      const passwordEncrypted = hash;

      await knex("user")
        .update({ password: passwordEncrypted })
        .where("_id", userId);

      const user: User = await knex("user").where("_id", userId).first();

      const auth = new Auth();

      return response.json({
        user,
        token: auth.generateToken({ id: user._id }),
      });
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const auth = new Auth();

    const user = await knex("user").where("email", email).first();

    if (!user)
      return response
        .status(400)
        .send({ error: "Incorrect email address and / or password." });

    if (!(await bcrypt.compare(user._id + password, user.password))) {
      return response
        .status(400)
        .send({ error: "Incorrect email address and / or password." });
    }
    user.password = undefined;
    user.createdAt = undefined;

    return response.send({ user, token: auth.generateToken({ user: user }) });
  }

  async findUserForBoard(request: Request, response: Response) {
    const { param, board_id = 0 } = request.query;

    if (!board_id) return response.send();

    let users = Array();

    if (param)
      users = await knex
        .select("*")
        .from("user")
        .join("user_board", "user._id", "=", "user_board.user_id")
        .where("user_board.board_id", "<>", Number(board_id))
        .andWhere("name", "ilike", "%" + String(param) + "%")
        .orWhere("email", "ilike", "%" + String(param) + "%")
        .limit(20);
    else users = await knex.select("*").from("user").limit(20);

    return response.json(users);
  }

  async findUser(request: Request, response: Response) {
    const { param, added } = request.query;

    let users: User[] = [];

    if (param && added) {
      let addedIds = (added as string).split(",");
      users = await knex
        .select("*")
        .from("user")
        .whereRaw("_id not in (" + addedIds + ")")
        .andWhereRaw(
          `(name like '%${String(param)}%' or email like  '%${String(param)}%')`
        )
        .limit(20);
    }
    // else users = await knex.select("*").from("user").limit(20);

    return response.json(users);
  }

  async updateUser(request: Request, response: Response) {
    const { _id, username, email, name } = request.body;
    await knex("user").where({ _id }).update({ username, email, name });
    return response.status(200).send();
  }
}

export default AuthController;

import { Request, Response } from "express";
import knex from "../database/connection";
import Auth from "../utils/auth";
import User from "../models/User";
import bcrypt from "bcrypt";

class AuthController {
  async register(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      let users = await knex("user").where("email", email);

      if (users.length > 0) {
        return response.status(400).send({ error: "User already exists" });
      }

      const insertedId = await knex("user").returning("_id").insert({
        name,
        email
      });

      const userId = insertedId[0];

      const hash = await bcrypt.hash(userId + password, 10);
      const passwordEncrypted = hash;

      await knex('user').update({ password: passwordEncrypted }).where('_id', userId);

      const user: User = await knex("user").where("_id", userId).first();

      console.log(user);
      const auth = new Auth();

      return response.json({
        user,
        token: auth.generateToken({ id: user._id }),
      });
    } catch (err) {
      console.log(err);
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
    
    if (!await bcrypt.compare(user._id + password, user.password)) {
      return response.status(400).send({ error: 'Incorrect email address and / or password.' });
    }
    user.password = undefined;

    return response.send({ user, token: auth.generateToken({ id: user._id }) });
  }

  async findUser(request: Request, response: Response) {
    const { param } = request.query;

    let users = [];

    if (param)
      users = await knex.select('*').from('user').where('name', 'ilike', '%' + String(param) + '%').orWhere('email', 'ilike', '%' + String(param) + '%').limit(20);
    else
      users = await knex.select('*').from('user').limit(20);  

    return response.json(users);
  }
}

export default AuthController;

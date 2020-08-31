import jwt from "jsonwebtoken";
import auth from "../middlewares/auth";
import * as authConfig from '../config/auth.json';

export default class Auth {
  generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400,
    });
  }
}

import jwt from "jsonwebtoken";

export default class Auth {
  generateToken(params = {}) {
    return jwt.sign(params, "kanban", {
      expiresIn: 86400,
    });
  }
}

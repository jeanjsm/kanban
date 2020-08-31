import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).send({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return response.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: "Token malformatted" });
  }

  try {
    const jwtPayload = <any>jwt.verify(token, authConfig.secret);
    request.headers.user_id = jwtPayload.user._id;
    return next()
  } catch(err) {
    return response.status(401).send({ error: "Token invalid" });
  }
};

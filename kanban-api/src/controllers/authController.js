const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

module.exports = {
  async register(request, response) {
    const { email } = request.body;
    try {
      if (await User.findOne({ email })) {
        return response.status(400).send({ error: 'User already exists' });
      }
      const user = await User.create(request.body);
      user.password = undefined;
      return response.body({ user, token: generateToken({ id: user._id }) });
    } catch (err) {
      console.log(err);
      return response.status(400).send({ error: "Registration failed" });
    }
  },
  async authencicate(request, response) {
    const { email, password } = request.body;
    console.log(email, password);

    const user = await User.findOne({ email }).select("+password");

    if (!user) return response.status(400).send({ error: "User not found" });

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(400).send({ error: 'Invalid password' });
    }
    user.password = undefined;

    return response.send({ user, token: generateToken({ id: user._id }) });
  },
};

require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (payload) => {
  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

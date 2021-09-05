

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = () => {
  // context = { ... headers }
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        res.json('Invalid/Expired token');
      }
    }
    res.json("Authentication token must be 'Bearer [token]");
  }
  res.json('Authorization header must be provided');
};

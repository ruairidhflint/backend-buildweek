const jwt = require('jsonwebtoken');

function restrictedRoute(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid permissions' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

module.exports = {
  restrictedRoute,
};

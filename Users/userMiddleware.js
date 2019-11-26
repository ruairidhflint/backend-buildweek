const db = require('./userHelpers');

async function checkIfUserExists(req, res, next) {
  const { username } = req.body;
  const user = await db.getUserByUsername(username);
  if (user) {
    res.status(409).json({ message: 'This username is already in use!' });
  } else {
    next();
  }
}

module.exports = {
  checkIfUserExists,
};

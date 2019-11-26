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

function checkAllFieldsArePresent(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: 'Please ensure all fields are present' });
  }
}

module.exports = {
  checkIfUserExists,
  checkAllFieldsArePresent,
};

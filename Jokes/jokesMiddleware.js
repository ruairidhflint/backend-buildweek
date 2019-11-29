const db = require('./jokesHelpers');


async function checkJokeIDIsValid(req, res, next) {
  const { id } = req.params;
  const validJoke = await db.getJokeByID(id);
  if (validJoke) {
    req.userID = validJoke.user_id;
    next();
  } else {
    res.status(400).json({ message: 'No such Joke' });
  }
}

function checkPostIsValid(req, res, next) {
  const { joke_q, joke_a } = req.body;
  if (joke_q && joke_a) {
    next();
  } else {
    res.status(500).json({ message: 'Please ensure all fields are present!' });
  }
}

module.exports = {
  checkJokeIDIsValid,
  checkPostIsValid,
};

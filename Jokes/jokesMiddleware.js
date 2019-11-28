const db = require('./jokesHelpers');


  async function checkJokeIDIsValid(req, res, next) {
    const { id } = req.params;
    const validJoke = await db.getJokeByID(id);
    if (validJoke) {
      req.userID = validJoke.user_id;
      next();
    } else {
      res.status(400).json({ message: 'No such Joke'});
    }
  }

  module.exports = {
      checkJokeIDIsValid,
  }
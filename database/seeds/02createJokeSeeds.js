
exports.seed = function(knex) {
  return knex('jokes').del()
    .then(function () {
      return knex('jokes').insert([
        {id: 1, joke_q: 'Why did the chicken cross the road?', joke_a: 'To get to the other side!', private: 0, user_id: 1},
        {id: 2, joke_q: 'How do you get a squirrel to like you?', joke_a: 'Act a nut', private: 1, user_id: 1},
        {id: 3, joke_q: "Why can't a nose be 12 inches long?", joke_a: 'Because it would be a foot!', private: 0, user_id: 1 }
      ]);
    });
};

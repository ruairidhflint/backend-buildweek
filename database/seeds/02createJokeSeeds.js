
exports.seed = function (knex) {
  return knex('jokes').del()
    .then(() => {
      return knex('jokes').insert([
        {
          id: 1, joke_q: 'Why did the chicken cross the road?', joke_a: 'To get to the other side!', privated: 0, user_id: 1,
        },
        {
          id: 2, joke_q: 'How do you get a squirrel to like you?', joke_a: 'Act a nut', privated: 1, user_id: 1,
        },
        {
          id: 3, joke_q: "Why can't a nose be 12 inches long?", joke_a: 'Because it would be a foot!', privated: 0, user_id: 1,
        },
      ]);
    });
};

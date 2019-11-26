
exports.seed = function (knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1, username: 'rory', password: '1234',
        },
        {
          id: 2, username: 'rebecca', password: '1234',
        },
      ]);
    });
};

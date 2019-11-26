
exports.seed = function (knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1, username: 'test', password: '$2b$12$6el8udvmW43HYOnOJu1DLOEab1coHhzjbjoJl0HeZM5tSYC3YOsgO',
        },
      ]);
    });
};

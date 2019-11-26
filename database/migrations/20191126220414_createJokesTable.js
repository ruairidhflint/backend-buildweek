
exports.up = function (knex) {
    return knex.schema
      .createTable('jokes', (table) => {
        table.increments();
        table.text('joke_q')
          .notNullable();
        table.text('joke_a');
        table.boolean('private')
          .notNullable();
        table.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('jokes');
  };
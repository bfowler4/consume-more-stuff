const bcrypt = require(`bcrypt`);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(`users`).del()
  .then(function () {
    // Inserts seed entries
    return bcrypt.hash(`password`, 12)
    .then(hash => {
      return knex(`users`).insert([
        {
          username: `mika123`, 
          email: `mika@devleague.com`,
          password: hash
        }, 
        {
          username: `nick456`,
          email: `nick@devleague.com`,
          password: hash
        },
        {
          username: `brandon`,
          email: `brandon@devleague.com`,
          password: hash
        }
      ]);
    });
  });
};

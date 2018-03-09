const bookshelf = require(`./bookshelf`);

class User extends bookshelf.Model {
  get tableName() { return `users` }

  items() {
    return this.hasMany(`Item`);
  }
}

module.exports = bookshelf.model(`User`, User);
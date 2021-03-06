const bookshelf = require(`./bookshelf`);

class Item extends bookshelf.Model {
  get tableName() { return `items` }
  get hasTimestamps() { return true }

  user() {
    return this.belongsTo(`User`);
  }
}

module.exports = bookshelf.model(`Item`, Item);
const express = require(`express`);
const router = express.Router();
const User = require('../../db/models/User');
const handleError = require('../Utilities/errorHandler');
const isAuthenticated = require(`../Utilities/authenticator`);

const bcrypt = require(`bcrypt`);

const saltRounds = 12;

module.exports = router;

router.route('/:id')
.get(isAuthenticated, (req, res) => {
  if (req.params.id != req.user.id) {
    return res.status(403).json({ message: `Forbidden` });
  }

  return new User({ id: req.params.id })
  .fetch({ withRelated: `items` })
  .then((user) => {
    return res.json(user);
  })
  .catch((err) => {
    return handleError(err, res)
  });
})
.put((req, res) => {
  if (req.params.id != req.user.id) {
    return res.status(403).json({ message: `Forbidden` });
  }

  return new User({id: req.params.id})
  .fetch()
  .then((user) => {
    if (req.body.password) {
      return bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        req.body.password = hash;
        return user;
      });
    } else {
      return user;
    }
  })
  .then((user) => {
    return user.save(req.body, { require: true });
  })
  .then((user) => {
    return res.json(user);
  })
  .catch((err) => {
    return handleError(err, res);
  });
});
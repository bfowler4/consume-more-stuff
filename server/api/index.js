const express = require('express');
const router = express.Router();

const passport = require(`passport`);
const LocalStrategy = require(`passport-local`);
const bcrypt = require(`bcrypt`);

const User = require(`../db/models/User`);
const userRoute = require('./users');
const itemRoute = require('./items');
const handleError = require(`./Utilities/errorHandler`);

const saltRounds = 12;

module.exports = router;

// Passport setup
passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  return new User({ id: user.id })
  .fetch()
  .then(user => {
    user = user.toJSON();
    return done(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  return new User({ username: username })
  .fetch()
  .then(user => {
    if (user === null) {
      return done(null, false, { message: `bad username or password` });
    } else {
      user = user.toJSON();
      bcrypt.compare(password, user.password)
      .then(res => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: `bad username or password` });
        }
      });
    }
  });
}));

// Authentication routes
router.post(`/register`, (req, res) => {
  return bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      let { email, username } = req.body;
      return new User({ email, username, password: hash })
      .save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => handleError(err, res));
    });
  });
});

router.post(`/login`, passport.authenticate(`local`), (req, res) => {
  return res.json(req.user);
});

router.post(`/logout`, (req, res) => {
  req.logout();
  return res.json({ message: `user logged out` });
});

// User and Items routes
router.use('/users', userRoute);
router.use('/items', itemRoute);


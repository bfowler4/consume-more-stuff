const express = require('express');
const router = express.Router();
const Item = require('../../db/models/Item.js');
const handleError = require('../Utilities/errorHandler');
const isAuthenticated = require('../Utilities/authenticator');

const upload = require(`../Utilities/uploadToBucket`);


module.exports = router;

router.route('/')
.get((req, res) => {
  return Item
  .fetchAll()
  .then((items) => {
    return res.json(items);
  })
  .catch((err) => {
    return handleError(err, res);
  });
})
.post(isAuthenticated, upload, (req, res) => {
  let {
    id,
    title,
    description,
    price,
    condition,
    category,
    image_url
  } = req.body;
  let user_id = req.user.id;

  return new Item({
    id,
    title,
    description,
    price,
    condition,
    category,
    image_url,
    user_id
  })
  .save()
  .then((item) => {
    if (title.trim().length === 0 || description.trim().length === 0 || image_url.trim().length === 0) {
      return res.status(400).json({ message:'No Empty Input Fields' });
    }
    return res.json(item);
  })
  .catch((err) => {
    return handleError(err, res);
  });
});

router.route('/:id')
.get((req, res) => {
  return new Item({ id: req.params.id })
  .fetch()
  .then((item) => {
    if (item) {
      return res.json(item);
    }
    return res.status(404).json({ message: 'Item Not Found' });
  })
  .catch((err) => {  
    return handleError(err, res);
  });
})
.put(isAuthenticated, (req, res) => {
  return new Item({ id: req.params.id })
  .fetch()
  .then(item => {
    if (item) {
      return item;
    }
    throw new Error(`Item was not found`);
  })
  .then(item => {
    if (item.attributes.user_id === req.user.id) {
      return item;
    }
    throw new Error(`Forbidden`);
  })
  .then(item => {
    return item.save(req.body, { require: true });
  })
  .then(item => {
    return res.json(item);
  })
  .catch(err => {
    return handleError(err, res);
  });
});






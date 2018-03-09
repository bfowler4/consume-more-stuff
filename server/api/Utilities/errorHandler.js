let handleError = (err, res) => {
  switch (err.code) {
    case '23514':
      res.status(400).json({ message: 'Must Choose Condition and/or Category' });
      break;
    case '22P02':
      res.status(400).json({ message: 'Price Must Be a Number' });
      break;
    case '23502':
      res.status(400).json({ message: 'Missing Field(s)' });
      break;
    case '23505':
      let duplicatesArray = err.detail.match(/\(([^\)]+)\)/g);
      let key = duplicatesArray[0].replace(/[\(\)]/g, ``);
      let value = duplicatesArray[1].replace(/[\(\)]/g, ``);
      res.status(400).json({ 
        message: `A key violates duplicate value constraint`,
        key: key,
        value: value
      });
      break;
    default:
      res.status(400).json({ message: err.message });
      break;
  }
}

module.exports = handleError;
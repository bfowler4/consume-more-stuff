const AWS = require(`aws-sdk`);

AWS.config.loadFromPath(__dirname + `/../../../config/awsConfig.json`);
const s3 = new AWS.S3();

module.exports = (req, res, next) => {
  const key = Date.now().toString();
  const params = {
    Body: Buffer.from(req.body.imageFile.split(`,`)[1], `base64`),
    Bucket: `consume.more.stuff.image.bucket`,
    Key: key
  };
  s3.putObject(params, (err, data) => {
    if (err) console.log(err);
    else {
      req.body.image_url = `https://s3-us-west-1.amazonaws.com/consume.more.stuff.image.bucket/${key}`
      next();
    }
  })
}
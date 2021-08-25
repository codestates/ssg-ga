const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: "ssg-ga-multer-s3",
      key: (req, file, cb) => {
        cb(null, Date.now() + "." + file.originalname.split(".").pop());
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }),

  sendPost: (req, res) => {
    try {
      let payLoad = { url: req.file.location };
      res.status(200).json({ data: payLoad });
    } catch (err) {
      console.log(err);
      res.status(500).send("sorry");
    }
  },
};

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');

const validateImageUpload = require('../../validation/imageValidate');

// database configuration
const mongoURI = require('../../config/keys').mongoURI;

// load Image model
const Image = require('../../models/Images');

//create mongoDB connection for image storage
const CONNECTION = mongoose.createConnection(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//Init gfs && gridFSBucket
let gfs;
let gridFSBucket;

CONNECTION.once('open', () => {
  //init stream
  gfs = Grid(CONNECTION.db, mongoose.mongo);
  gridFSBucket = new mongoose.mongo.GridFSBucket(CONNECTION.db, {
    bucketName: 'image-uploads',
  });
  gfs.collection('image-uploads');
});

//create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        const fileName = buff.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName,
          bucketName: 'image-uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const imageMaxSize = 3 * 1000 * 1000;
const upload = multer({ storage, limits: { fileSize: imageMaxSize } });

// @ route GET /api/unsplash-app/photo
// @ description get all images
// @ access Public
router.get('/photo/all', (req, res) => {
  Image.find()
    .then((images) => res.json(images))
    .catch((err) => res.status(404).json({ message: 'No Images Found' }));
});

// @ route GET /api/unsplash-app/photo
// @ description get image by label name
// @ access Public
router.get('/photo/label/:labelName', (req, res) => {
  let errors = {};
  let labelName = req.params.labelName.toLowerCase();
  Image.find({ label: labelName })
    .then((image) => {
      if (image.length === 0) {
        errors.imageError = 'This label has no image attached to it';
        return res.status(404).json(errors);
      }
      return res.json(image);
    })
    .catch((err) => res.status(404).json({ message: 'No Images Found' }));
});

// @ route GET /api/unsplash-app/photo
// @ description get image by file name
// @ access Public
router.get('/photo/:filename', (req, res) => {
  let errors = {};

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if file exists
    if (!file || file.length === 0 || file === null) {
      errors.fileError = 'No file exists';
      return res.status(404).json(errors);
    }

    //check file content type
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/jpg' ||
      file.contentType === 'image/png'
    ) {
      //read to browser
      const readStream = gridFSBucket.openDownloadStream(file._id);
      //   const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
      //   console.log(file);
    } else {
      errors.fileError = 'Not an image';
      res.status(404).json(errors);
    }
  });
});

// @ route GET /api/unsplash-app/photo
// @ description get image by id
// @ access Public
// router.get('/photo/:id', (req, res) => {
//   const errors = {};

//   Image.findById(req.params.id)
//     .then((image) => {
//       if (!image) {
//         errors.imageError = 'No Image for the specified ID';
//         return res.status(404).json(errors);
//       }

//       //   res.json(image);

//       gfs.files.findOne({ filename: image.imageFileName }, (err, file) => {
//         //check if files exist
//         if (!file || file.length === 0 || file === null) {
//           errors.imageError = 'No file exists';
//           return res.status(404).json(errors);
//         }

//         //check content type
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/jpg' ||
//           file.contentType === 'image/png'
//         ) {
//           //read to browser
//           const readStream = gridFSBucket.openDownloadStream(file._id);
//           readStream.pipe(res);
//         } else {
//           errors.imageError = 'Not an image';
//           res.status(404).json(errors);
//         }
//       });
//     })
//     .catch((err) => res.status(404).json(err));
// });

// @ route Post /api/unsplash-app/photo
// @ description upload image to db route
// @ access Public
router.post('/photo', upload.single('image'), (req, res) => {
  const { errors, isValid } = validateImageUpload(req.body);

  //check if there are no image file
  if (!req.file) {
    errors.imageError =
      'An image is required, Only .png, .jpg and .jpeg format allowed! max 3mb.';
    return res.status(400).json(errors);
  }

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const url = req.protocol + '://' + req.get('host');

  // create new image object
  const newImage = new Image({
    label: req.body.label.toLowerCase(),
    imageLink: `${url}/api/unsplash-app/photo/${req.file.filename}`,
    imageFileName: req.file.filename,
  });
  newImage.save().then((image) => res.json(image));

  // //check if image name already exists
  // Image.findOne({ label: req.body.label }).then((image) => {
  //   if (image) {
  //     errors.imageError = 'This name already has an image attached to it';
  //     return res.status(400).json(errors);
  //   } else {
  //     // create new image object
  //     const newImage = new Image({
  //       label: req.body.label.toLowerCase(),
  //       imageLink: `${url}/api/unsplash-app/photo/${req.file.filename}`,
  //       imageFileName: req.file.filename,
  //     });
  //     newImage.save().then((image) => res.json(image));
  //   }
  // });
});

// @ route Delete /api/unsplash-app/photo
// @ description delete image from database
// @ access Public
router.delete('/photo/remove/:id', (req, res) => {
  const errors = {};

  Image.findById(req.params.id)
    .then((image) => {
      if (!image) {
        errors.imageError = 'There is no image with the specified ID';
        return res.status(404).json(errors);
      }
      image.remove().then(() => {
        res.json({ success: true });
      });
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;

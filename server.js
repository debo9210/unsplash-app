const express = require('express');
const mongoose = require('mongoose');

const imageUploadApi = require('./routes/api/imageUpload');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to Unsplash App (:');
});

app.use('/api/unsplash-app', imageUploadApi);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running @ port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const imageUploadApi = require('./routes/api/imageUpload');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

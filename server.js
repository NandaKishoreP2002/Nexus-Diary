const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const login = require('./routes/login');
const diary = require('./routes/diary');
const updateRoute = require('./routes/update');
const deleteEntry = require('./routes/deleteEntry');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const pass_word=process.env.password;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8082;
const db = "mongodb+srv://admin-nandu:"+pass_word+"@cluster0.kil1ki7.mongodb.net/diaryDB?retryWrites=true&w=majority";
//const db="mongod://localhost:27017/diaryDB"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected.....'))
    .catch(err => console.log(err));

app.use('/', login);
app.use('/', diary);
app.use('/', updateRoute)
app.use('/', deleteEntry);



app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, 'build', 'index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => console.log(`Server Started on port ${port}`));
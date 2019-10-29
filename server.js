'use strict';

var express = require('express');
var cors = require('cors');
const fm = require('formidable');
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', async (req, res) => {
  let form = new fm.IncomingForm();

  form.parse(req, (err, fields, files) => {
    res.json({
      name: files.upfile.name,
      type: files.upfile.type,
      size: files.upfile.size
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

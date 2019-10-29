'use strict';

var express = require('express');
var cors = require('cors');
const fm = require('formidable');
const fs = require('fs');
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

app.post('/api/fileanalyse', (req, res) => {
  let form = new fm.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) throw err;

    const oldPath = files.upfile.path;
    fs.mkdir(process.cwd() + '/upload_files', { recursive: true }, (err0) => {
      if (err0) throw err0;
    });
    const newPath = process.cwd() + '/upload_files/' + files.upfile.name;

    fs.copyFile(oldPath, newPath, (err0) => {
      if (err0) throw err0;
      fs.unlink(oldPath, (err1) => {
        if (err1) throw err1;
        console.log('Old file is deleted.')
      })
    })
    res.json({
      name: files.upfile.name,
      type: files.upfile.type,
      size: files.upfile.size,
      path: files.upfile.path
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

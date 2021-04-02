var express = require('express');
var cors = require('cors');
require('dotenv').config()

//multer npm for handling file uploads
var multer  = require('multer') 
var upload = multer({ dest: 'uploads/' }) //file upload destination

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//where you will be redirectede
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  res.json({"name": req.file.originalname, "type": req.file.mimetype , "size": req.file.size});
})

//example for single upload
/*<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
}) */




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

var express = require('express');
var postController = require('../controllers/postController');
var path = require('path');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */

var accessLogStream = fs.createWriteStream(path.join(__dirname,"../", 'access.log'), {flags: 'a'})


router.get('/', function(req, res, next) {
  res.render('gallery', {title : "r"});
});

router.post('/', function(req, res, next){
  postController.handleData(req)
    .then(
      () => {
        accessLogStream.write(req.body.url+"\n");
        res.render('success', {location : "/r", layout : false});
      },
      (err) => {
        res.write(err);
        res.end();
      }
    );
});



module.exports = router;

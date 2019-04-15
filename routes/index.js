var express = require('express');
var fetchController = require('../controllers/fetchController');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : "Welcome", layout : false});
});

router.get('/pictures/:id', function(req, res, next){
  fetchController.fetchData(req.params.id)
    .then(
      (data)=>{
        res.json(data);
        res.end();
      },
      (err)=>{
        res.write('404');
        res.end();
      }
    );
});

module.exports = router;

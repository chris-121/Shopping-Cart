var express = require('express');
var router = express.Router();
var productHelpers=require('../healpers/product-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-product', { title: 'Express',products});
  })
  
});

module.exports = router;

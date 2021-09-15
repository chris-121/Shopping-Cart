var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let product=[
  {
    name:'Iphone XR', 
    category:'Mobile', 
    price:75000,
    description:'the brand new Iphone XR ',
    Image:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-white-select-201809?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1551226036668"
  
  },
  {
    name:'Iphone XR' ,
    category:'Mobile' ,
    price:75000,
    description:'the brand new Iphone XR',
    Image:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-white-select-201809?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1551226036668" 
  
  },
  {
    name:'Iphone XR' ,
    category:'Mobile' ,
    price:75000,
    description:'the brand new Iphone XR' ,
    Image:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-white-select-201809?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1551226036668"
  
  },
  {
    name:'Iphone XR' ,
    category:'Mobile' ,
    price:75000,
    description:'the brand new Iphone XR' ,
    Image:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-white-select-201809?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1551226036668"
  
  },

]
  res.render('index', { title: 'Express',product,admin:true});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var productHelpers=require('../healpers/product-helpers');
/* GET users listing. */
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
  res.render('admin/view-products',{title:'Express' ,product ,admin:true});
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true});
})
router.post('/admin/add-products',(req,res)=>{

  //console.log(req.body);
  //console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv("./public/images/product-images"+id+".jpg",(err,done)=>{
      if(err)
      console.log(err)
      else
      res.render('admin/view-products',{admin:true});
    })
    
    
  })

})
module.exports = router;

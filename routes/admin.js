var express = require('express');
var router = express.Router();
var productHelpers=require('../healpers/product-helpers');
//var collections=require('../config/collections')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{title:'Express' ,products,admin:true});
  })
  
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true});
})
router.post('/admin/add-products',(req,res)=>{

  //console.log(req.body);
  //console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv("./public/images/"+id+".jpg",(err,done)=>{
      if(err)
      console.log(err)
      else
      res.render('admin/view-products',{admin:true});
    })
    
    
  })

})
module.exports = router;

var express = require('express');
const app = require('../app');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers');
//var collections=require('../config/collections')
/* GET users listing. */

const verifyLogin=(req,res,next)=>{
  if(req.session.admin){
    next()
  }else{
    res.redirect('/admin/login')
  }
}
const verifyLoginPage=(req,res,next)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }else{
    next()
  }
}
router.get('/',verifyLogin, function(req, res, next) {
    productHelpers.getAllProducts().then((products)=>{
      res.render('admin/view-products',{title:'Express' ,products,adminPage:true,logout:true});
    })
});
router.get('/login',(req,res)=>{
    res.render('admin/admin-login',{adminPage:true})
})
router.get('/add-products',verifyLogin,(req,res)=>{
  res.render('admin/add-products',{adminPage:true,logout:true});
})
router.post('/admin/add-products',verifyLogin,(req,res)=>{

  //console.log(req.body);
  //console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv("./public/images/"+id+".jpg",(err,done)=>{
      if(err)
      console.log(err)
      else
      res.redirect('/admin');
    })
    
    
  })

})
router.get('/delete-product/:id',verifyLogin,(req,res)=>{
  let prodId=req.params.id
  productHelpers.deleteProduct(prodId,()=>{
    res.redirect('/admin')
  })
    
})
router.post('/login',verifyLoginPage,(req,res)=>{
  productHelpers.adminLogin((req.body),()=>{
    req.session.admin=true
    res.redirect('/admin')
  })
})
router.get('/edit-product/:id',verifyLogin,async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
    res.render('admin/edit-products',{adminPage:true,logout:true,product});
  })
router.post('/edit-product/:id',verifyLogin,(req,res)=>{
  console.log(req.body)
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv("./public/images/"+req.params.id+".jpg")
    }
  })
   
   
})

router.get('/logout',(req,res)=>{
  req.session.admin=false
  res.redirect('/')
})
module.exports = router;

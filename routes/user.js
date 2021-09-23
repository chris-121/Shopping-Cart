var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
var userHelpers=require('../helpers/user-helpers')

/* GET home page. */
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  } 
}
router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-product', { title: 'Express',products,user});
  })
  
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render("user/login-page",{title:'Shopping Cart',"loginErr":req.session.loginErr});
    req.session.loginErr=false

  }


});
router.get('/SignUp',(req,res)=>{
  res.render("user/SignUp-page",{title:"Shopping Cart"})
})

router.post('/SignUp',(req,res)=>{
  userHelpers.addUserData(req.body).then((res)=>{

  })
})
router.post('/login',(req,res)=>{
  userHelpers.login(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
    
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,(req,res)=>{
  res.render('user/cart')
})

module.exports = router;

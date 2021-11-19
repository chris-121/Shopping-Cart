var express = require('express');
const session = require('express-session');
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
router.get('/',async function(req, res, next) {
  let user=req.session.user
  let cartCount=null
  if(req.session.user){
    cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-product', { title: 'Express',products,user,cartCount});
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
  userHelpers.addUserData(req.body).then((ress)=>{
    req.session.loggedIn=true
    req.session.user=ress
    res.redirect('/')
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
router.get('/cart',verifyLogin,async(req,res)=>{
  let cartCount=await userHelpers.getCartCount(req.session.user._id)
  let products=await userHelpers.getCartProducts(req.session.user._id)
  if(cartCount!=0){
    var totalValue=await userHelpers.getTotalAmount(req.session.user._id)
  }else{
    var totalValue=0
  }

  
  console.log(products)
  res.render('user/cart',{products,user:req.session.user,cartCount,totalValue})
})
router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
  })
})
router.post('/change-product-quantity',verifyLogin,(req,res,next)=>{
  console.log(req.body)
  userHelpers.changeQuantityCount(req.body).then(async(response)=>{
    let cartCount=await userHelpers.getCartCount(req.session.user._id)
    if(cartCount!=0){
      response.total=await userHelpers.getTotalAmount(req.body.user)
      res.json(response)
    }else{
      res.json(response)
    }
    
    

  })
})
router.get('/place-order',verifyLogin,async(req,res)=>{
  let total=await userHelpers.getTotalAmount(req.session.user._id)
  res.render('user/place-order',{total,user:req.session.user})
})
router.post('/place-order',verifyLogin,async(req,res)=>{
  //console.log(req.body)
  let products=await userHelpers.getCartProductList(req.session.user._id)
  let totalPrice=await userHelpers.getTotalAmount(req.body.userId)
  userHelpers.placeOrder(req.body,products,totalPrice).then((response)=>{
    res.json({status:true})
  })
})
router.get('/order-placed',verifyLogin,(req,res)=>{
  res.render('user/order-placed',{user:req.session.user})
})
router.get('/orders',verifyLogin,async(req,res)=>{
  let orders=await userHelpers.getUserOrders(req.session.user._id)
  res.render('user/orders',{user:req.session.user,orders})
})
router.get('/view-order-products/:id',verifyLogin,async(req,res)=>{
  let products=await userHelpers.getOrderProducts(req.params.id)
  res.render('user/view-order-products',{user:req.session.user,products})
})

module.exports = router;

const express = require('express');
const { url } = require('inspector');
const router = express.Router();
const path = require('path');
// file sistemi ile


const data = {
  title:'Blog Detay',
}


router.use('/blogs/:blogid',function(req,res){

  res.render('users/blog_details');
  
  
  });

  router.use('/blogs',function(req,res){

    res.render('users/blogs');
    
    });

router.use('/',function(req,res){

res.render('users/index',data);
});

router.use('*',function(req,res){
  
  res.sendFile(path.join(__dirname,'../views/users','404.html'));
  });

module.exports = router;
const express = require('express');
const router = express.Router();

const path = require('path');

// file sistemi ile
router.use('/admin/blog/create',function(req,res){


  res.render('admin/blog_create');
  
});

router.use('/admin/blog/:blogid',function(req,res){
    
    
      res.render('admin/blog_edit');
    });
router.use('/admin/blogs',function(req,res){
  
  
    res.render('admin/blog_list');
  });




module.exports = router;
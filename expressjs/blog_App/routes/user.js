const express = require('express');
const { url } = require('inspector');
const router = express.Router();
const path = require('path');
// file sistemi ile


const data = {
  title:'Blog Detay',
  blogs:[
    {
      blodid:1,
      title:'Blog 1',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'1.png',
      hompage:true,
      newBadge:true,
    },
    {
      blodid:2,
      title:'Blog 2',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'2.png',
      hompage:true,
      newBadge:true,
    },
    {
      blodid:3,
      title:'Blog 3',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'3.png',
      hompage:true,
      newBadge:false,
    },
    {
      blodid:4,
      title:'Blog 4',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'4.png',
      hompage:true,
      newBadge:false,
    },
    {
      blodid:5,
      title:'Blog 5',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'5.png',
      hompage:false,
      newBadge:false,
    },
    {
      blodid:6,
      title:'Blog 6',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'6.png',
      hompage:false,
      newBadge:false,
    },
    {
      blodid:7,
      title:'Blog 7',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'7.png',
      hompage:false,
      newBadge:true,
    },
    {
      blodid:8,
      title:'Blog 8',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.',
      image:'8.png',
      hompage:false,
      newBadge:true,
    }
  ]
}


router.use('/blogs/:blogid',function(req,res){

  res.render('users/blog_details');
  
  
  });

  router.use('/blogs',function(req,res){

    res.render('users/blogs',data);
    
    });

router.use('/',function(req,res){

res.render('users/index',data);
});

router.use('*',function(req,res){
  
  res.sendFile(path.join(__dirname,'../views/users','404.html'));
  });

module.exports = router;
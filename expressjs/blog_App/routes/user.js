const express = require('express');
const { url } = require('inspector');
const router = express.Router();
const path = require('path');
// file sistemi ile

const db = require('../data/db');


router.use('/blogs/:blogid',async function(req,res){

  const id = req.params.blogid;

  try {
    const [blogs,] = await db.execute('SELECT * FROM blog WHERE blogid = ?',[id]);

    console.log(blogs);
    if (blogs.length === 0) {
      res.redirect('/')
    }
    
    res.render('users/blog_details',{
      title:blogs[0].title,
      blog:blogs[0],
      blogid:id,
    });
  } catch (error) {
    console.log(error);
    
  }
  
  
  });


  router.use('/blogs',async function(req,res){
    const id = req.params.blogid;
    try {
      const [blogs] = await db.execute('SELECT * FROM blog');
      res.render('users/blogs',{
        title:'Blog Listesi',
        blogs:blogs,
        blogid:id
      });

    } catch (error) {
      console.log(error);
      
    }

       
    
    });

router.use('/',async function(req,res){
  const id = req.params.blogid;
  try {
    const [blogs] = await db.execute('SELECT * FROM blog');
    res.render('users/index',{
      title:'Blog Detay',
      blogs:blogs,
      blogid:id
    });
    
  } catch (error) {
    console.log(error);
    
  }
  
});

router.use('*',function(req,res){
  
  res.sendFile(path.join(__dirname,'../views/users','404.html'));
  });

module.exports = router;
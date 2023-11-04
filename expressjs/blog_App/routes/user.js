const express = require('express');
const { url } = require('inspector');
const router = express.Router();
const path = require('path');
// file sistemi ile

const db = require('../data/db');


router.use('/blogs/category/:categorid',async function(req,res){
  
   
  try {
    const [blogs] = await db.execute('SELECT * FROM blog');
    const [categories] = await db.execute('SELECT * FROM categories');
      // console.log(blogs.filter(blog =>blog.categoryid== req.params.categorid));
      // console.log(blogs);
      // console.log(req.params.categorid);
      
      

   
    
    res.render('users/blogs',{
      title:'Category Listesi',
      blogs:blogs.filter(blog => blog.categoryid == req.params.categorid),
      isSelectedId:req.params.categorid,
   
      category:categories
    });

  } catch (error) {
    console.log(error);
    
  }

     
  
  });

router.use('/blogs/:blogid',async function(req,res){

  const id = req.params.blogid;

  try {
    const [blogs,] = await db.execute('SELECT * FROM blog WHERE blogid = ?',[id]);
    const [categories] = await db.execute('SELECT * FROM categories');
    const category = categories.filter(category => category.idcategories === blogs[0].categoryid)[0].name;
    // console.log(category);
    if (blogs.length === 0) {
      res.redirect('/')
    }
    
    res.render('users/blog_details',{
      title:blogs[0].title,
      blog:blogs[0],
      blogid:id,
      category:category,
      isSelectedId:null,
    });
  } catch (error) {
    console.log(error);
    
  }
  
  
  });


  router.use('/blogs',async function(req,res){
  
   
    try {
      const [blogs] = await db.execute('SELECT * FROM blog');
      const [categories] = await db.execute('SELECT * FROM categories');
        // console.log(categories);
     
      
      res.render('users/blogs',{
        title:'Blog Listesi',
        blogs:blogs,
        isSelectedId:null,
     
        category:categories
      });

    } catch (error) {
      console.log(error);
      
    }

       
    
    });

router.use('/',async function(req,res){
  const id = req.params.blogid;
  try {
    const [blogs] = await db.execute('SELECT * FROM blog');
    const [categories] = await db.execute('SELECT * FROM categories');
    // console.log(categories);
    // console.log(blogs);
    
    res.render('users/index',{
      title:'Blog Detay',
      blogs:blogs,
      blogid:id,
      category:categories,
      isSelectedId:null,
    });
    
  } catch (error) {
    console.log(error);
    
  }
  
});

router.use('*',function(req,res){
  
  res.sendFile(path.join(__dirname,'../views/users','404.html'));
  });

module.exports = router;
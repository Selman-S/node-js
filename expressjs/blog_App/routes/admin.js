const express = require('express')
const router = express.Router()

const path = require('path')
const db = require('../data/db')

// file sistemi ile




//! ------------------ admin routes -------------------
router.get('/admin/blog/create', async function (req, res) {
  try {
    const [categories] = await db.execute('SELECT * FROM categories')

    res.render('admin/blog_create', {
      title: 'Add Blog',
      categories: categories,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/admin/blog/create', async function (req, res) {
  const title = req.body.title
  const description = req.body.description
  const image = req.body.image
  const category = req.body.category
  const isHomePage = req.body.isHomePage == 'on' ? 1 : 0
  const isAccepted = req.body.isAccepted == 'on' ? 1 : 0

  try {
    const [result] = await db.execute(
      'INSERT INTO blog (title,description,image,isHomePage,isAccepted,categoryid) VALUES (?,?,?,?,?,?)',
      [title, description, image, isHomePage, isAccepted, category]
    )
    console.log(result)
    res.redirect('/admin/blogs?action=create')
  } catch (error) {
    console.log(error)
  }
})

router.get('/admin/blog/:blogid', async function (req, res) {
  const blogid = req.params.blogid
  try {
    const [blogs] = await db.execute('SELECT * FROM blog WHERE blogid = ?', [
      blogid,
    ])
    const [categories] = await db.execute('SELECT * FROM categories')
    const category = categories.filter(
      category => category.idcategories === blogs[0].categoryid
    )[0]?.name
    const blog = blogs[0]
    console.log(blog)
    console.log(category)
    if (blog) {
      
     return res.render('admin/blog_edit', {
        title: blog.title,
        categories: categories,
        blog: blog,
        category: category,
      })
    }
    res.redirect('/admin/blogs')
  } catch (error) {
    console.log(error)
  }
})


router.post('/admin/blog/:blogid', async function (req, res) {
  const blogid = req.params.blogid
  const title = req.body.title
  const description = req.body.description
  const image = req.body.image
  const category = req.body.category
  const isHomePage = req.body.isHomePage == 'on' ? 1 : 0
  const isAccepted = req.body.isAccepted == 'on' ? 1 : 0

  try {
    const [result] = await db.execute(
      'UPDATE blog SET title = ?, description = ?, image = ?, isHomePage = ?, isAccepted = ?, categoryid = ? WHERE blogid = ?',
      [title, description, image, isHomePage, isAccepted, category, blogid]
    )
    console.log(result)
    res.redirect('/admin/blogs?action=update')
  } catch (error) {
    console.log(error)
  }
});

router.get('/admin/blogs', async function (req, res) {
  try {
    const [blogs] = await db.execute(
      'SELECT blogid,title,image,isHomePage,isAccepted FROM blog'
    )
    console.log("blogs")
if (req.query.action !== undefined) {
  if (req.query.action === 'create') {
 
    res.locals.message = 'Blog başarıyla oluşturuldu'
    
  }else if(req.query.action === 'update'){
    res.locals.message = 'Blog başarıyla güncellendi'
} else if(req.query.action === 'delete'){
  res.locals.message = 'Blog başarıyla silindi'
}
}
    res.render('admin/blog_list', {
      title: 'Admin Blog Listesi',
      blogs: blogs,
      message:res.locals.message
    })
  } catch (error) {
    console.log(error)
  }
})


router.post('/admin/blogs/', async function (req, res) {
  const blogid = req.body.blogid
console.log(blogid);

  
  try {
    const [result] = await db.execute('DELETE FROM blog WHERE blogid = ?', [
      blogid,
    ])
    console.log(result)
    res.redirect('/admin/blogs?action=delete')
  } catch (error) {
    console.log(error)
  }
})
//! ------------------ admin routes -------------------

//! ------------------ category routes -------------------
router.get('/admin/categories', async function (req, res) {
  try {
    const [categories] = await db.execute(
      'SELECT idcategories,name FROM categories'
      )
       console.log("categories")
      
      res.render('admin/category_list', {
        title: 'Admin Category Listesi',
        categories
      })
    } catch (error) {}
  });
  
  router.get('/admin/category/create', async function (req, res) {
    try {
      res.render('admin/category_create', {
        title: 'Add Category',
      })
    } catch (error) {
      console.log(error)
    }
  });

  router.post('/admin/category/create', async function (req, res) {
    const name = req.body.name
    const [categories] = await db.execute('SELECT * FROM categories')
    const lastId = categories[categories.length - 1].idcategories;

    try {
      const [result] = await db.execute(
        'INSERT INTO categories (idcategories,name) VALUES (?,?)',
        [lastId+1,name]
        )
        console.log(result)
        res.redirect('/admin/categories')
      } catch (error) {
        console.log(error)
      }
    });

    router.get('/admin/category/:categoryid', async function (req, res) {
      const categoryid = req.params.categoryid
      try {
        const [categories] = await db.execute('SELECT * FROM categories WHERE idcategories = ?', [
          categoryid,
          ])
          const category = categories[0]
          console.log(category)
          if (category) {
            return res.render('admin/category_edit', {
              title: category.name,
              category: category,
            })
          }
          res.redirect('/admin/categories')
        } catch (error) {
          console.log(error)
        }
      }
    );

    router.post('/admin/category/:categoryid', async function (req, res) {

      const categoryid = req.params.categoryid
      const name = req.body.name
      console.log(name);
      
      try {
        const [result] = await db.execute(
          'UPDATE categories SET name = ? WHERE idcategories = ?',
          [name, categoryid]
          )
          console.log(result)
          res.redirect('/admin/categories')
        } catch (error) {
          console.log(error)
        }
      }
    );


    router.post('/admin/categories/', async function (req, res) {
      const categoryid = req.body.idcategories
 
      
      
      try {
        const [result] = await db.execute('DELETE FROM categories WHERE idcategories = ?', [
          categoryid,
          ])
          console.log(result)
          res.redirect('/admin/categories')
        } catch (error) {
          console.log(error)
        }
      }
    );

  //! ------------------ category routes -------------------
  
module.exports = router

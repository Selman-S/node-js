const express = require('express');
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));


const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use("/libs",express.static(path.join(__dirname,'node_modules')));
app.use("/static",express.static(path.join(__dirname,'public')));

app.use(adminRoutes);
app.use(userRoutes);




// app.use((req,res,next)=>{
//     console.log('first middleware1');

//     next();
// })
// app.use((req,res,next)=>{
//   console.log('first middleware2');

// res.end('Hello  the web server side2...');
// })

// routes 


// app.use('/blogs/:blogid',function(req,res){
//   res.send('<h1>Blog detay</h1>')
  
//   });

//   app.use('/blogs',function(req,res){
//     res.send('<h1>Blog sayfası</h1>')
    
//     });

// app.use('/',function(req,res){
// res.send('<h1>anasayfa</h1>')

// });
      






app.listen(3000,function(){
    console.log('listening on 3000');
   
});


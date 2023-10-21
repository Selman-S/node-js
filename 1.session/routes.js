var fs = require('fs');



const routesHandler=(request, response) => {


  if (request.url == '/index.html') {
    response.writeHead(200,
      {'Content-Type': 'text/html'})
    fs.readFile('index.html', (err, html) => {
      response.write(html)
      response.end()
    });
  } else if (request.url == '/about.html') {
    fs.readFile('about.html', (err, html) => {
      response.write(html)
      response.end()
    });
  } else if (request.url == '/contact.html') {
    fs.readFile('contact.html', (err, html) => {
      response.write(html)
      response.end()
    })
  }else if (request.url == '/form.html') {
    fs.readFile('form.html', (err, html) => {
      response.write(html)
      response.end()
    })
  }else if (request.url == '/form'&& request.method == 'POST') {

    const data = [];
    request.on('data', (chunk) => {

      data.push(chunk);
   
    });

request.on('end', () => {
  console.log('end');

  const result = Buffer.concat(data).toString();
  console.log(result);
  const parsedData ='\n'+ result.split('&').join('\n');
  console.log(parsedData);
  
     fs.appendFile('form.txt',parsedData, (err) => {
        if (err) {
          console.log(err);
          
        }else {
          response.statusCode = 302;
          response.setHeader('Location', '/form.html');
          response.end(); 
        }
      })

});

 
  } else {
    fs.readFile('404.html', (err, html) => {
      response.write(html)
      response.end()
    })
  }

  
console.log(request.url);

}

module.exports = routesHandler;
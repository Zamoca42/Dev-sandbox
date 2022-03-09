var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js'); //모듈화
var path = require('path'); //입력정보 보안
var sanitizeHtml = require('sanitize-html'); //<script> 필터링

// 서버 호출
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // 홈으로 연결
    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./data', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.HTML(title, list, 
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
          });
      } else {
        // 연결된 페이지 데이터 불러오기
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description)
          var list = template.list(filelist);
          var html = template.HTML(title, list, 
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a> 
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
             </form>
             `
             //delete는 링크를 사용하면 위험함
          );
          response.writeHead(200);
          response.end(html);
          });
       });
      }
    //게시물 작성
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
         <p>
          <textarea name="description" placeholder="description"></textarea>
         </p>
         <p>
          <input type="submit">
        </p>
        </form>
        `,'');
        response.writeHead(200);
        response.end(html);
      });
    //게시물 작성하고 작성된 게시물 쿼리페이지로 이동
    } else if(pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
    //게시물 수정
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title, list, 
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
           <p>
           <textarea name="description" placeholder="description">${description}</textarea>
          </p>
           <p>
          <input type="submit">
          </p>
         </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
        });
     });
     //게시물 수정하고 수정된 쿼리페이지로 이동
    }else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var id = new URLSearchParams(body).get('id');
        var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });
    //게시물 삭제하고 홈으로 이동
    }else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var id = new URLSearchParams(body).get('id');
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(){
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });
    }else{
      response.writeHead(404);
      response.end('Not found');
    }
 
});
app.listen(3000);
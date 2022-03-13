const express = require('express');
const app = express();


//listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})
app.listen(8080, function() {
    console.log('listening on 8080')
});

//누군가 /pet으로 방문을 하면 pet관련 안내문을 띄워주자
app.get('/pet', function(request, response){
    response.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(request, response){
    response.send('뷰티용품 쇼핑 페이지임');
});

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});
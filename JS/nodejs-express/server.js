const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/write', function(request, response){
    response.sendFile(__dirname + '/write.html');
});

//어떤 사람이 /add 경로로 POST 요청을 하면...
app.post('/add', function(request, response){
    response.send('전송완료');
    console.log(request.body);
});
const express = require('express');
const app = express();
const db_config = require('./db_config.json');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect(`${db_config.database}`, function(error, client){
    //연결되면 할 일
    if (error) return console.log(error)
    //데이터베이스에 연결
    db = client.db('todoapp');

    // db.collection('post').insertOne( {_id: 100, 이름 : 'John', 나이 : 20}, function(error, result){
    //     console.log('저장완료');
    // });

    //listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})
    app.listen(8080, function() {
        console.log('listening on 8080')
    });
})


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
    db.collection('post').insertOne( {날짜 : `${request.body.date}`, 제목 : `${request.body.title}`}, function(error, result){
        console.log('저장완료');
    });
});
const express = require('express');
const app = express();
const db_config = require('./db_config.json');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engin', 'ejs');

var db;
MongoClient.connect(`${db_config.database}`, function(error, client){
    //연결되면 할 일
    if (error) return console.log(error)
    //데이터베이스에 연결
    db = client.db('todoapp');

    // MongoDB 테스트
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
    //쿼리문과 비슷함 - counter에서 게시물 갯수라는 항목을 찾는다
    db.collection('counter').findOne({name : '게시물갯수'}, function(error,result){
        //총 게시물 갯수를 변수에 저장
        var totalPosts = result.totalPost;

        //DB에 저장
        db.collection('post').insertOne( { _id : totalPosts + 1, 날짜 : request.body.date, 제목 : request.body.title}, function(error, result){
            console.log('저장완료');
            //게시물 갯수 id항목 1증가 - updateOne은 수정
            db.collection('counter').updateOne( {name:'게시물갯수'},{ $inc : {totalPost:1} }, function(error, result){
                //$set, $inc은 update전용 operator
                if(error){return console.log('error')}
                console.log('수정완료')
            });
        });
        
    }); 
});

// /list 로 get요청으로 실제 DB에 저장된 테이터들로 접속하면 HTML을 보여줌
app.get('/list', function(request,response){
    
    db.collection('post').find().toArray(function(error, result){
        console.log(result);
        response.render('list.ejs', { posts : result});
    });
});


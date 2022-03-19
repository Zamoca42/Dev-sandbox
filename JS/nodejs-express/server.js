const express = require('express');
const app = express();
const db_config = require('./db_config.json');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const { request } = require('express');
app.use(methodOverride('_method'));
app.set('view engin', 'ejs');

app.use('/public', express.static('public'));

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
    response.render('index.ejs');
});

app.get('/write', function(request, response){
    response.render('write.ejs');
});

//어떤 사람이 /add 경로로 POST 요청을 하면...
app.post('/add', function(request, response){
    response.redirect('/list');
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
                console.log('수정완료');
            });
        });
        
    }); 
});

// /list 로 get요청으로 실제 DB에 저장된 테이터들로 접속하면 HTML을 보여줌
app.get('/list', function(request,response){
    
    db.collection('post').find().toArray(function(error, result){
        response.render('list.ejs', { posts : result});
    });
});

//db에 게시물번호를 가진 글을 삭제해주세요
app.delete('/delete', function(request,response){
    console.log(request.body)
    request.body._id = parseInt(request.body._id);
    db.collection('post').deleteOne(request.body, function(error, result){
        console.log('삭제완료');
        response.status(200).send({ message : 'Success'});
    });
});

//detail로 상세페이지를 연결하고 뒤에 /:id로 id에 해당하는 db로 라우팅
app.get('/detail/:id', function(request,response){
    var postid = parseInt(request.params.id)
    db.collection('post').findOne({_id : postid}, function(error, result){
        response.render('detail.ejs', { data  : result});
    })
})

//edit으로 수정페이지를 연결하고 뒤에 /:id로 id에 해당하는 db로 라우팅
app.get('/edit/:id', function(request, response){
    var postid = parseInt(request.params.id)
    db.collection('post').findOne({_id : postid}, function(error, result){
        console.log(result);
        response.render('edit.ejs', { post  : result});
    });
});

//put요청으로 DB수정 process
app.put('/edit', function(request, response){
    db.collection('post').updateOne({_id : parseInt(request.body.id)},{ $set : { 제목 : request.body.title, 날짜 : request.body.date } }, function(error, result) {
        console.log('수정완료');
        response.redirect('/list');
    });
});
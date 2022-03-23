const express = require('express');
const app = express();
const db_config = require('./db_config.json');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const { request, response } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const {ObjectId} = require('mongodb');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engin', 'ejs');
app.use(session({secret : db_config.password, resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/public', express.static('public'));

var db;
MongoClient.connect(db_config.database, function(error, client){
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

app.get('/login', function(request, response){
    response.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
    failureRedirect : '/fail'
}), function(request, response){
    response.redirect('/')
});

app.get('/mypage', logincorrect, function(request, response){
    console.log(request.user)
    response.render('mypage.ejs', {user: request.user})
});

function logincorrect(request, response, next){
    if (request.user){
        next()
    } else {
        response.send('로그인안하셨는데요?')
    }
}

passport.use(new LocalStrategy({
    usernameField: 'id', //사용자가 제출한 아이디가 어디 적혔는지, input태그 name = "id"
    passwordField: 'pw', //사용자가 제출한 비밀번호가 어디 적혔는지, input태그 name = "pw"
    session: true, //세션을 만들건지?
    passReqToCallback: false, //아이디, 비번말고 다른 정보검사가 필요한지
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      //done(서버에러, 성공시사용자DB데이터, 에러메시지)
      if (입력한비번 == 결과.pw) { //문제점: 평문 그대로 비교
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

//id를 이용해서 세션을 저장시키는 코드 (로그인성공시)
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

//세션데이터에 있으면 마이페이지를 보여줌
passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({id : 아이디}, function(error, result){
    done(null, result)
  })
  
}); 

//서버에서 Query String 처리하는 방법(indexing 이진 탐색)
app.get('/search', (request, response) => {
    var searchCondition = [
        {
            $search: {
                index: 'titleSearch',
                text: {
                  query: request.query.value,
                  path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
                }
              }
            },
            { $sort : { _id : 1} }
        ]
    db.collection('post').aggregate(searchCondition).toArray((error, result) => {
        if(error) {
            return response.redirect('/');
        }
        console.log(result);
        response.render('result.ejs', {posts : result});
    });
})

//누군가 '/'경로로 접속했을 때 shop.js로 라우팅
app.use('/shop', require('./routes/shop.js'));

app.use('/board/sub', require('./routes/board.js'));

let multer = require('multer');
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/image')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname ) //파일명 자유롭게 선택가능 file.originalname + new Date()
    },
    filefilter : function(req, file, cb){ //원하는 파일 확장자만 받는법
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('PNG, JPG만 업로드하세요'))
        }
        callback(null, true) 
    }
});

var upload = multer({storage : storage});

app.get('/upload', function(request, response){
    response.render('upload.ejs')
})

//upload.js에서 하나의 파일만 업로드를 받아서 image폴더에 저장
app.post('/upload', upload.single('profile'), function(request, response){
    response.send('업로드완료')
});

app.get('/image/:imageName', function(요청, 응답){
    응답.sendFile( __dirname + '/public/image/' + 요청.params.imageName )
  })

  app.post('/chatroom',logincorrect, function(request, response){
    var chat = {
        title : '채팅방',
        member : [ObjectId(request.body.당한사람id), request.user._id],
        date : new Date()
    }
    db.collection('chatroom').insertOne(chat).then(function(result){
        response.send('저장완료');
        });
    });

app.get('/chat', logincorrect, function(request, response){ 

    db.collection('chatroom').find({ member : request.user._id }).toArray().then((result)=>{
      console.log(result);
      response.render('chat.ejs', {data : result})
    });
  
  }); 
var router = require('express').Router();

function logincorrect(request, response, next){
    if (request.user){
        next()
    } else {
        response.send('로그인안하셨는데요?')
    }
}

router.use('/shirts', logincorrect);

router.get('/shirts', function(request, response){
    response.send('셔츠 파는 페이지입니다.');
 });
 
 router.get('/pants', function(request, response){
    response.send('바지 파는 페이지입니다.');
 }); 

//shop.js를 다른 곳으로 내보낼때
module.exports = router;
var router = require('express').Router();

function logincorrect(request, response, next){
    if (request.user){
        next()
    } else {
        response.send('로그인안하셨는데요?')
    }
}

router.get('/sports',logincorrect, function(request, response){
    response.send('스포츠 게시판');
 });
 
 router.get('/game',logincorrect, function(request, response){
    response.send('게임 게시판');
 }); 

 module.exports = router;
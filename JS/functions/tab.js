// 버튼0 누르면
// - 모든버튼에 붙은 orange 클래스명 제거
// - 버튼0에 orange 클래스명 추가
// - 모든 div에 붙은 show 클래스명 제거
// - 모든div에 붙은 show 클래스명 제거
// - div0에 show 클래스명 추가


var button = document.querySelectorAll('.tab-button');
var content = document.querySelectorAll('.tab-content');
var tab_num = document.querySelectorAll('.tab-button').length;

//jQeury + dataset

$('.list').click(function(e){
    탭열기(e.target.dataset.id);
})

function 탭열기(구멍){
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(구멍).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(구멍).addClass('show');
  }


//반복문으로

// for (let i = 0; i < tab_num; i++) {
//     button[i].addEventListener('click', function(){
//         for (let j = 0; j < tab_num; j++){
//             button[j].classList.remove('orange');
//         };
//         button[i].classList.add('orange');
//         for (let k = 0; k < tab_num; k++){
//             content[k].classList.remove('show');
//         };
//         content[i].classList.add('show');
//     });
// }


// button[0].addEventListener('click', function(){
//     button[0].classList.remove('orange');
//     button[1].classList.remove('orange');
//     button[2].classList.remove('orange');
//     button[0].classList.add('orange');
//     content[0].classList.remove('show');
//     content[1].classList.remove('show');
//     content[2].classList.remove('show');
//     content[0].classList.add('show');

// })

// button[1].addEventListener('click', function(){
//     button[0].classList.remove('orange');
//     button[1].classList.remove('orange');
//     button[2].classList.remove('orange');
//     button[1].classList.add('orange');
//     content[0].classList.remove('show');
//     content[1].classList.remove('show');
//     content[2].classList.remove('show');
//     content[1].classList.add('show');
// })

// button[2].addEventListener('click', function(){
//     button[0].classList.remove('orange');
//     button[1].classList.remove('orange');
//     button[2].classList.remove('orange');
//     button[2].classList.add('orange');
//     content[0].classList.remove('show');
//     content[1].classList.remove('show');
//     content[2].classList.remove('show');
//     content[2].classList.add('show');
// })



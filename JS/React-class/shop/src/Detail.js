import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

//컴포넌트에 직접 스타일 넣어서 스타일링하기 - css를 미리 입혀놓은 컴포넌트
let Box = styled.div`
  padding : 20px;
`;

let Title = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`;



function Detail(props){

    let [alert,setAlert] = useState(true);
    let [inputValue,setInputValue] = useState('');
    
    useEffect(()=>{
      let 타이머 = setTimeout(()=>{setAlert(false)}, 2000)
      return ()=>{ clearTimeout(타이머)}//unmount될 때 실행
    },[alert]);//[조건] : 조건의 State가 변경될때만 실행

    let { id } = useParams(); //라운터의 useParams 훅
    let history = useHistory();
    let 찾은상품 = props.shoes.find( x => x.id == id);

    return (
        <div className="container">
          <Box>
            <Title>상세페이지</Title>
          </Box>
          
          <input onChange={ (e)=>{ setInputValue(e.target.value)}} />

          {
            alert === true
            ?(<div className='my-alert2'>
              <p>재고가 얼마 남지 않았습니다</p>
              </div>)
            : null 
          }

        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>

            <Info 재고={props.재고}></Info>

            <button className="btn btn-danger" onClick={()=>{ props.재고변경([9,11,12])}}>주문하기</button> 
            <button className="btn btn-primary" onClick={ ()=>{
                history.goBack(); //뒤로가기
            } }>뒤로가기</button> 
          </div>
        </div>
      </div> 
    )
  }

  function Info(props){
    return (
      <p>재고 : {props.재고[0]} </p>
    )
  }

export default Detail;


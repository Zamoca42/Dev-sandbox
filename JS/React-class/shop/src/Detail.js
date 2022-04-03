import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {재고context} from './App.js';
import './Detail.css'
import { Navbar,Nav,Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SwitchTransition, CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';

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
    let [누른탭, 누른탭변경] = useState(0);
    let 재고 = useContext(재고context);
    let [스위치, 스위치변경] = useState(false);
    
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

            <button className="btn btn-danger" onClick={()=>{ 
              props.재고변경([9,11,12]);
              props.dispatch({type : '항목추가', payload : {id : 2, name : '새상품', quan : 1} });
              history.push('/cart');

            }}>주문하기</button> 
            <button className="btn btn-primary" onClick={ ()=>{
                history.goBack(); //뒤로가기
            } }>뒤로가기</button> 
          </div>
        </div>

        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0)}}>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1)}}>Option 2</Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={스위치} classNames="wow" timeout={1000}>
          <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
        </CSSTransition>    
      </div> 
    )
  }

  function TabContent(props){

    useEffect(()=>{
      props.스위치변경(true);
    });

    if (props.누른탭 === 0) {
      return <div>0번째 내용입니다</div>
    } else if (props.누른탭 === 1) {
      return <div>1번째 내용입니다</div>
    } else if (props.누른탭 === 2) {
      return <div>2번째  내용입니다</div>
    }
    
  }

  function Info(props){
    return (
      <p>재고 : {props.재고[0]} </p>
    )
  }

  
  function 함수명(state){ //state를 props화 해주세요
    return {
        state : state.reducer,
        alert열렸니 : state.reducer2
    }
}

export default connect(함수명)(Detail)



import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App(){
  

  //Es6 destructuring
  let [title, titleChange] = useState(['남자코트 추천', '강남 우동 맛집', '리액트 state 사용법', 'Typescript 독학']); //useState = [사용할 제목, 수정할 제목]
  let posts = '강남 고기 맛집';
  let [ thumb, thumbChange ] = useState(0);
  let [modal, switchModal] = useState(false);
  let [clickTitle, setClickTitle] = useState(0);

  let {inputValue, setInputValue} = useState('');

  function setTitle(){
    var newArray = [...title]; //...은 deep copy
    newArray[0] = '여자코트 추천';
    titleChange(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      {/* <button onClick={setTitle}>변경</button>
      <div className="list">
        <h3>{ title[0] } <span onClick={ ()=>{thumbChange(thumb + 1)} }>👍</span> {thumb} </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ title[1] }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3 onClick={()=>{switchModal(!modal)}}>{ title[2] }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div> */}
      {
        title.map(function(head, loop){
          return ( 
            <div className="list" key={loop}>
              <h3 onClick={()=>{setClickTitle(loop)}}>{ head }</h3>
              <p>2월 17일 발행</p>
              <hr/>
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e)=>{ setInputValue(e.target.value)} }/>
        <button onClick={ ()=>{
          let arrayCopy = [...title];
          arrayCopy.unshift(inputValue);
          titleChange( arrayCopy );
        } }>저장</button>
      </div>
      
      {/* <input onChange={ (e)=>{ setInputValue(e.target.value) } } /> */}

      {/* <button onClick={ ()=>{setClickTitle(1)} }>버튼1</button>
      <button onClick={ ()=>{setClickTitle(2)} }>버튼2</button>
      <button onClick={ ()=>{setClickTitle(3)} }>버튼3</button> */}
      <button onClick={ ()=>{switchModal(!modal)}}>열고닫기</button>

      {
        modal === true
        ? <Modal title={title} clickTitle={clickTitle}/>
        : null
      }
    </div>
  );
}

function Modal(props){
  return (
    <div className="modal">
        <h2>{props.title[props.clickTitle]}</h2>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
  )
}

export default App;

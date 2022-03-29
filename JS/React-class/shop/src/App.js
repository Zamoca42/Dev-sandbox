import {useState} from 'react';
import logo from './logo.svg';
import { Navbar,Nav,Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import shoesData from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch, Routes } from 'react-router-dom';

function App() {

  let [shoes, setShoes] = useState(shoesData);
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className='link-light link'>ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='link-light link'>Home</Nav.Link>
            <Nav.Link as={Link} to="/detail" className='link-light link'>Detail</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Switch>
        <Route exact path="/">
          <div className="p-5 bg-light bg text-white">
            <div className='my-3'>
              <h1>20% Season Off</h1>
            </div>
            <div>
              <p>This is a simple hero unit, a simple blahblah</p>
            </div>
            <Button variant="primary">Primary</Button>{' '}
          </div>
          <div className='container'></div>
        <div className='row'>
          {
            shoes.map((head,loop)=>{
              return <ShoeList shoes={shoes[loop]} loop={loop} key={loop}></ShoeList>
            })
          }
        </div>
        <button className='btn btn-primary' onClick={()=>{

          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ setShoes([...shoes, ...result.data])
          })//성공했을 때 실행
          .catch(()=>{

          });//실패했을 때 실행

        }}>더보기</button>
  
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </Route>

      </Switch>

     </div>
  );
}



function ShoeList(props){
  return (
      <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes'+(props.loop + 1)+'.jpg'} width="100%"/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.content} & {props.shoes.price}</p>
      </div>
  )
}

export default App;

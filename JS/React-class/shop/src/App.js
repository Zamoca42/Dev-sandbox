import {useState} from 'react';
import logo from './logo.svg';
import { Navbar,Nav,Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import shoesData from './data.js';
import Detail from './Detail.js';

import { Link, Route, Switch, Routes } from 'react-router-dom';

function App() {

  let [shoes, setShoes] = useState(shoesData);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to="/" className='link-light link'>ShoeShop</Link></Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link><Link to="/" className='link-light link'>Home</Link></Nav.Link>
            <Nav.Link><Link to="/detail" className='link-light link'>Detail</Link></Nav.Link>
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
  
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes}/>
        </Route>

        <Route path="/:id">
          <div>아무거나적었을 때 이거 보여주셈</div>
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

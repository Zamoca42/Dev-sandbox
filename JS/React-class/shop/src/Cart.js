import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            <div>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                  </tr>
                </thead>
                { 
                props.state.map((a,i)=>{
                      return (
                      <tr key={i}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.quan}</td>
                        <td>
                          <button onClick={()=>{ props.dispatch({ type : '수량증가'}) }}>+</button>
                          <button onClick={()=>{ props.dispatch({ type : '수량감소'}) }}>-</button>
                        </td>
                      </tr>
                      )
                    })  }
              </Table>
            </div>
        </div>
    )
}

function 함수명(state){ //state를 props화 해주세요
    return {
        state : state
    }
}

export default connect(함수명)(Cart)

//export default Cart;
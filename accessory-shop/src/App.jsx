import { useState, useRef } from 'react'
import { useLocalStorage } from 'react-use';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap'; // Import the Button component from the appropriate library

import { Form } from 'react-bootstrap';
import productList from './accessory-proudct.json'
import DataTable from './component/DataTable';
import {TotalPriceContext} from './context.jsx';

import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  const pRef = useRef()
  const qRef = useRef()
  const [price, setPrice] = useState(productList[0].price)
  const [totalPrice, setTotalPrice] = useState(0)

  // TODO change this back to normal array, since it is not a state to be displayed any longer.
  // const [selectedItems, setSelectedItems] = useState([])
  const [selectedItems, setSelectedItems, remove] = useLocalStorage("selected-items",[])
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([...selectedItems])

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1)
    setSelectedItems([...selectedItems])
    setFilteredSelectedItems([...selectedItems])
  }

  const filter = (keyword) => {
    const filteredItems = selectedItems.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    )

    setFilteredSelectedItems(filteredItems)
  }

  const handleAdd = (e) => {
    const pid = pRef.current.value
    const product = productList.find(p => p.id == pid)
    const q = qRef.current.value
    selectedItems.push({
      // id: product.id,
      // name: product.name,
      // price: product.price,
      ...product,
      quantity: q
    })
    console.table(selectedItems)
    setSelectedItems([...selectedItems])
    setFilteredSelectedItems([...selectedItems])
  }

  const handleProductChanged = (e) => {
    const pid = e.target.value
    const product = productList.find(p => p.id == pid)
    const p = product.price
    console.log(p)
    setPrice(p)
  }

  return (
    <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
      <Container>
        <Row>
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select ref={pRef} onChange={handleProductChanged}>
              {
                productList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              }
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            Price:
          </Col>
          <Col>
            {price}
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <input type="number" ref={qRef}
              defaultValue={1} />
          </Col>
        </Row>
        <Button variant="secondary" onClick={handleAdd}>Add</Button>

        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
          onFilter={filter} />
      </Container>
      <h1>Total Price: {totalPrice.toFixed(2)}</h1>
    </TotalPriceContext.Provider>
  )

}

export default App

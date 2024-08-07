import { useState, useRef } from 'react'
import {
  Button, Container, Row, Col,
} from 'react-bootstrap'; // Import the Button component from the appropriate library

import { Form } from 'react-bootstrap';
import productList from './accessory-proudct.json'
import DataTable from './component/DataTable';


function App() {

  const pRef = useRef()
  const qRef = useRef()
  const [price, setPrice] = useState(productList[0].price)

  const [selectedItems, setSelectedItems] = useState([])
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]) 

  const deleteItemByIndex = (index) => { 
      selectedItems.splice(index, 1) 
      setSelectedItems([...selectedItems])
      setFilteredSelectedItems([...selectedItems]) 
   } 
  const handleAdd = (e) => {
    const pid = pRef.current.value
    const product = productList.find(p => p.id == pid)
    const q = parseInt(qRef.current.value)
    const existingItem = selectedItems.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.qty += q
    } else {
      selectedItems.push({
        ...product,
        qty: q
      })
    }

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

  const sortAscending = () => {
    const sortedData = [...selectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setSelectedItems(sortedData);
    setFilteredSelectedItems(sortedData);
  };

  const sortDescending = () => {
    const sortedData = [...selectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setSelectedItems(sortedData);
    setFilteredSelectedItems(sortedData);
  };

  const search = (keyword) => {
    setFilteredSelectedItems([
      ...selectedItems.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    ])
  }

  return (
    <>
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
        <Button variant="primary" onClick={handleAdd}>Add</Button>

        <DataTable data={filteredSelectedItems} onDelete={deleteItemByIndex} onSearch={search} onSortAscending={sortAscending}
        onSortDescending={sortDescending} />
      </Container>
    </>
  )

}

export default App
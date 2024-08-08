import { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocalStorage } from 'react-use'; 

import productList from './accessory.json';
import DataTable from './components/DataTable';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const sRef = useRef(); // Ref for search input
  const [price, setPrice] = useState(productList[0]?.price || 0);
  const [selectedItems, setSelectedItems, remove] = useLocalStorage('selectedItems', []);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([...selectedItems]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(productList[0] || {});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setPrice(selectedProduct.price * quantity);
  }, [quantity, selectedProduct]);

  useEffect(() => {
    console.log('Filtered Items:', filteredSelectedItems);
  }, [filteredSelectedItems]);

  const handleAdd = () => {
    const pid = selectedProduct.id;
    const product = productList.find(p => p.id == pid);
    if (product) {
      const q = parseInt(qRef.current.value, 10);
      const existingItem = selectedItems.find(item => item.id === product.id);
      if (existingItem) {
        // Update quantity of existing item
        existingItem.qty += q;
        existingItem.price += product.price * q; // Update the price based on quantity
        const updatedItems = [...selectedItems];
        setSelectedItems(updatedItems);
        setFilteredSelectedItems(updatedItems); // Update filtered items
      } else {
        // Add new item
        const newItem = {
          ...product,
          qty: q,
          price: product.price * q // Set the initial price based on quantity
        };
        const updatedItems = [...selectedItems, newItem];
        setSelectedItems(updatedItems);
        setFilteredSelectedItems(updatedItems); // Update filtered items to include new item
      }
    }
    setShowModal(false);
  };

  const handleProductChanged = (product) => {
    setSelectedProduct(product);
    setPrice(product.price * quantity);
  };

  const deleteItemByIndex = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
    setFilteredSelectedItems(newSelectedItems); // Update filtered items to reflect deletion
  };

  const search = (keyword) => {
    const filtered = selectedItems.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSelectedItems(filtered);
  };

  const handleSearch = () => {
    const keyword = sRef.current.value;
    search(keyword);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredSelectedItems].sort((a, b) => {
      if (sortType === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setFilteredSelectedItems(sorted);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleShowModal}>Choose Product</Button>
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
            <input
              type="number"
              ref={qRef}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min="1"
            />
          </Col>
        </Row>
        <Button variant="secondary" onClick={handleAdd}>Add</Button>

        <div className="my-3 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <input type="text" placeholder="Search..." ref={sRef} className="form-control" />
            <Button onClick={handleSearch} className="ms-2 d-flex align-items-center">
              <i className="bi bi-search me-2"></i> Search
            </Button>
          </div>
        </div>

        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
          onSort={handleSort} // Pass the sort handler
        />

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select onChange={(e) => handleProductChanged(productList.find(p => p.id == e.target.value))}>
              {productList.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default App;

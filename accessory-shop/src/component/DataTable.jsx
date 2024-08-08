import React, { useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const DataTable = ({ data, onDelete, onSearch, onSortAscending, onSortDescending }) => {
    const sRef = useRef();

    const handleSearch = () => {
        const keyword = sRef.current.value;
        onSearch(keyword);
    };

    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '}
            <Button onClick={handleSearch}> <i class="bi bi-search"></i>{' '}Search</Button>
            <span className="mx-5" style={{ verticalAlign: 'middle' }}>
                    <label>Sort</label>{' '}{' '}
                    <Button variant="outline-primary" onClick={() => onSortAscending()}><i class="bi bi-arrow-up"></i></Button>{' '}
                    <Button variant="outline-primary" onClick={() => onSortDescending()}><i class="bi bi-arrow-down"></i></Button>
            </span> 
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>-</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i className="bi bi-trash" onClick={() => onDelete(index)}></i>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
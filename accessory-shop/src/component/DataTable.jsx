import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { TotalPriceContext } from '../context.jsx';
import { useEffect } from 'react';

const DataTable = ({ data, onDelete, onFilter }) => {


    const { totalPrice, setTotalPrice } = React.useContext(TotalPriceContext)
    let sum = 0
    // console.table(data)

    // This will be executed once after the compoent is rendered.
    useEffect(() => {
        if (data)
            sum = data.reduce((acc, item) => acc + item.price * item.quantity, 0)
        setTotalPrice(sum)
    })

    const sRef = React.useRef()
    const handleDelete = (index) => {
        console.debug('Delete', index)
        onDelete(index)
        // data.splice(index, 1)
        // console.table(data  )
    }

    const handleSearch = () => {
        const keyword = sRef.current.value
        console.log('Search', keyword)
        onFilter(keyword)
    }

    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '}
            <Button onClick={handleSearch}
                variant="outline-dark">
                <i className="bi bi-search"></i> Search
            </Button>
            <Table className="table table-striped border dark">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>-</th>
                        <th style={{ textAlign: 'center' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Price</th>
                        <th style={{ textAlign: 'center' }}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>
                                <i className="bi bi-trash"
                                    onClick={() => handleDelete(index)}></i>
                            </td>
                            <td>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>${item.price.toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
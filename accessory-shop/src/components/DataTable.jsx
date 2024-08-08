import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DataTable = ({ data, onDelete, onSort }) => {
    return (
        <div>
            <div className="my-3 d-flex align-items-center">
                <Button onClick={() => onSort('asc')} variant="primary" className="ms-2">
                    <i className="bi bi-arrow-up"></i> {/* Up arrow for ascending */}
                </Button>
                <Button onClick={() => onSort('desc')} variant="primary" className="ms-2">
                    <i className="bi bi-arrow-down"></i> {/* Down arrow for descending */}
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i className="bi bi-trash" onClick={() => onDelete(index)} style={{ cursor: 'pointer' }}></i> {/* Trash icon */}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;

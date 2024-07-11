import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);

  function handlePriceChange(e) {
    let p = e.target.value;
    let discountedPrice = p - discount;
    let v = discountedPrice * 0.07;
    setVat(v.toFixed(2));
  }

  function handleDiscountChange(e) {
    let d = e.target.value;
    setDiscount(d);
    let p = price;
    let discountedPrice = p - d;
    let v = discountedPrice * 0.07;
    setVat(v.toFixed(2));
  }

  return (
    <>
      <h2>VAT Calculator</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ fontSize: '20pt' }}
        />
        <br />
        <label>Discount:</label>
        <input
          type="number"
          value={discount}
          onChange={handleDiscountChange}
          style={{ fontSize: '20pt' }}
        />
        <br />
        <p>VAT = {vat}</p>
      </div>
    </>
  );
}

export default App;
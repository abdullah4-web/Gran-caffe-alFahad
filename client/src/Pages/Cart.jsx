import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import EmptyCart from '../Components/EmptyCart'
import { Table, Image, Button } from 'react-bootstrap';


const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return <div> <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-4 bg-dark hero-header mb-3 hero-header-large">
        <div className="container text-center my-3 pt-1 pb-1">
        </div>
      </div>  < EmptyCart /></div>
    </div>;
  }

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId); // Pass productId directly
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId); // Pass productId directly
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Pass productId directly
  };

  const handleClearCart = () => {
    clearCart(); // Define the handleClearCart function
  };

  // Function to calculate the total price for an item
  const calculateItemTotal = (item) => {
    return item.price * (item.quantity || 0); // Handle case where quantity is undefined
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  return (
    <div className="container-xxl bg-white p-0">
  {/* Apply hero-header only on larger screens */}
  <div className="container-xxl py-4 bg-dark hero-header mb-3 hero-header-large">
    <div className="container text-center my-3 pt-1 pb-1">
      {/* Content for hero header */}
    </div>
  </div>
  <div className="container">
    <h2>Shopping Cart</h2>
    <Table responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td><Image src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
            <td>{item.name}</td>
            <td>
              <div className="quantity-controls">
                <Button variant="danger" onClick={() => handleDecreaseQuantity(item._id)}>-</Button>
                <span className="quantity">{item.quantity || 0}</span>
                <Button variant="primary" onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
              </div>
            </td>
            <td>{item.price}</td>
            <td>{calculateItemTotal(item)}</td>
            <td><Button variant="danger" onClick={() => handleRemoveFromCart(item._id)}>Remove</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <div className="cart-summary">
      <p>Total: {calculateTotalPrice()}</p>
      <Button variant="success" onClick={handleClearCart}>Clear Cart</Button>
    </div>
  </div>
</div>
  
  );
};

export default Cart;

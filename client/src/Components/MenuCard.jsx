import React, { useContext } from 'react';
import { CartContext } from '../Pages/CartContext'; // Assuming the file path to your context file

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item); // Call addToCart function with the item
  };

  return (
    <div className="col-lg-6">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded-start"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.price} AED</p>
              <p className="card-text">{item.description}</p>
              <button className="btn btn-outline-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MenuCard = ({ menuItems }) => {
  return (
    <div className="row g-4">
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
};

export default MenuCard;

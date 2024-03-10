import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function EditMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(AuthContext);

  // Function to fetch all menu items from backend
  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/menu/allmenuitems', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        }
      });
      setMenuItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setIsLoading(false);
    }
  };

  // Function to delete a menu item by ID
  const deleteMenuItem = async (itemId) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/menu/deletemenuitem/${itemId}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        }
      });
      // After deletion, fetch updated menu items
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setIsLoading(false);
    }
  };

  // Function to handle editing a menu item (placeholder function for now)
  const editMenuItem = (itemId) => {
    // Implement editing functionality as needed
    console.log("Editing menu item with ID:", itemId);
  };

  // useEffect hook to fetch menu items when component mounts
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      <div className="bg-dark">
        <div className="container-xxl py-5 hero-header-large">
          {/* Your hero content here */}
        </div>
      </div>
      <div className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="section-title ff-secondary text-primary fw-normal">Edit Menu</h5>
            <h1>Menu Items</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {menuItems.map((item) => (
                  <div className="col" key={item._id}>
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
                            <button className="btn btn-outline-primary me-2" onClick={() => editMenuItem(item._id)}>Edit</button>
                            <button className="btn btn-outline-danger" onClick={() => deleteMenuItem(item._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditMenu;

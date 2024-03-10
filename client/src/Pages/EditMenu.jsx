import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Spinner from '../Components/Spinner';

function EditMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});
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

  // Function to open the modal and set the editing item
  const openModal = (item) => {
    setEditingItem(item);
    setEditedItem({ ...item });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Function to handle submitting the edited item
  const submitEditedItem = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/menu/editmenuitem/${editingItem._id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        }
      });
      // After editing, fetch updated menu items
      fetchMenuItems();
      setIsModalOpen(false); // Close modal after editing
    } catch (error) {
      console.error('Error editing menu item:', error);
      setIsLoading(false);
    }
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
              <Spinner />
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
                            <button className="btn btn-outline-primary me-2" onClick={() => openModal(item)}>Edit</button>
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

      {/* Modal for editing menu item */}
     
{isModalOpen && (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Menu Item</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={editedItem.name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price (AED)</label>
                <input type="number" className="form-control" id="price" name="price" value={editedItem.price} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={editedItem.description} onChange={handleInputChange}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={submitEditedItem}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </>
)}

    </>
  );
}

export default EditMenu;

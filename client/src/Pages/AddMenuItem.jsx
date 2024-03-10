import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext';

const categoryEnum = ['Food', 'Beverages'];
const subcategoryOptions = {
  Food: ['Breakfast', 'Starters', 'Soup', 'Salad', 'Main', 'Side Dishes', 'Risotto & Pasta', 'Pizza', 'Kids Menu', 'Eclair', 'Gelato', 'Blue Cheesecake'],
  Beverages: ['Coffee', 'Tea', 'Juices & Milkshakes', 'Soft Drinks & Water']
};

const AddMenuItem = () => {
  const { state, logout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setValue('subcategory', ''); // Reset subcategory field when category changes
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('subcategory', data.subcategory);
      formData.append('image', data.image[0]);

      const response = await axios.post('/api/menu/addmenuitem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${state.user.token}`,
        }
      });

      setIsLoading(false);

      if (response.status === 201) {
        toast.success('Menu item added successfully!');
        reset(); // Reset form fields after successful submission
      } else {
        toast.error('Error adding menu item. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401 && error.response.data === 'Invalid Admin Token') {
        toast.error('Invalid Admin Token. Please log in again.');
        logout();
      } else {
        console.error('Error adding menu item:', error);
        toast.error('Error adding menu item. Please try again.');
      }
    }
  };

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-4 bg-dark hero-header mb-3">
        <div className="container text-center my-3 pt-1 pb-1">
        </div>
      </div>
      <Container className="p-1">
        <div className="border p-4 mx-auto my-1 shadow-sm" style={{ maxWidth: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="h4 bold text-center text-uppercase">
              Add New Menu Item
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register('name', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...register('price', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                {...register('description', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                {...register('image', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                {...register('category', { required: true })}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categoryEnum.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subcategory:</Form.Label>
              <Form.Control
                as="select"
                {...register('subcategory', { required: true })}
              >
                <option value="">Select Subcategory</option>
                {subcategoryOptions[selectedCategory]?.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <BeatLoader size={8} color="white" />
              ) : (
                'Add Menu Item'
              )}
            </Button>{" "}
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </Container>
    </div>
  );
};

export default AddMenuItem;

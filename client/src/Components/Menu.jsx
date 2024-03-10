import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import axios from 'axios';
import Spinner from '../Components/Spinner'
const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/menu/allmenuitems');
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Extracting unique categories from menuItems
  const categories = [...new Set(menuItems.map(item => item.category))];
  const foodSubcategories = [...new Set(menuItems.filter(item => item.category === 'Food').map(item => item.subcategory))];
  const beverageSubcategories = [...new Set(menuItems.filter(item => item.category === 'Beverages').map(item => item.subcategory))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when changing category
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Filter menuItems based on selectedCategory and selectedSubcategory
  const filteredMenuItems = selectedCategory && selectedSubcategory ?
    menuItems.filter(item => item.category === selectedCategory && item.subcategory === selectedSubcategory) :
    selectedCategory ?
    menuItems.filter(item => item.category === selectedCategory) :
    menuItems;

  return (
    <div className='bg-white'>
      <div className="container-xxl ">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item py-1">
                <button
                  type="button"
                  className={`btn ${selectedCategory === null ? 'btn-primary' : 'btn-outline-primary'} me-3`}
                  onClick={() => handleCategoryClick(null)}
                >
                  All
                </button>
              </li>
              {categories.map((category, index) => (
                <li className="nav-item p-2" key={index}>
                  <button
                    type="button"
                    className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} me-3`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
            {selectedCategory === 'Food' && (
              <div>
                <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                  {foodSubcategories.map((subcategory, index) => (
                    <li className="nav-item p-2" key={index}>
                      <button
                        type="button"
                        className={`btn ${selectedSubcategory === subcategory ? 'btn-primary' : 'btn-outline-primary'} me-3`}
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedCategory === 'Beverages' && (
              <div>
                <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                  {beverageSubcategories.map((subcategory, index) => (
                    <li className="nav-item p-2" key={index}>
                      <button
                        type="button"
                        className={`btn ${selectedSubcategory === subcategory ? 'btn-primary' : 'btn-outline-primary'} me-3`}
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="tab-content">
              {loading ? (
                <Spinner />
              ) : (
                <MenuCard menuItems={filteredMenuItems} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

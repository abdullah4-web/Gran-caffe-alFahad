import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Pages/AuthContext';
import { Dropdown } from 'react-bootstrap';

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const { state, logout } = useContext(AuthContext); // Get user state and logout function from AuthContext

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleCloseNav = () => {
        setIsNavOpen(false);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <div className="container-xxl position-relative p-0">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>GRAN CAFFE</h1>
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={handleToggleNav}>
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0 pe-4">
                            <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={handleCloseNav}>Home</Link>
                            <Link to="/about" className={`nav-item nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={handleCloseNav}>About</Link>
                            <Link to="/services" className={`nav-item nav-link ${location.pathname === '/services' ? 'active' : ''}`} onClick={handleCloseNav}>Service</Link>
                            <Link to="/menu" className={`nav-item nav-link ${location.pathname === '/menu' ? 'active' : ''}`} onClick={handleCloseNav}>Menu</Link>
                            <Link to="/team" className={`nav-item nav-link ${location.pathname === '/team' ? 'active' : ''}`} onClick={handleCloseNav}>Team</Link>
                            <Link to="/contact" className={`nav-item nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={handleCloseNav}>Contact</Link>
                        </div>
                        {state.user ? ( // Check if user is logged in
                            <>
                                {state.user && state.user.name ? (
                                    <>
                                        {state.user.isAdmin ? (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="adminDropdown">
                                                    ADMIN
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/dashboard" onClick={handleCloseNav}>Dashboard</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/allorders" onClick={handleCloseNav}>All Orders</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/addmenuitem" onClick={handleCloseNav}>Add Menu Item</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/editmenuitem" onClick={handleCloseNav}>Edit Menu</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/dashboard" onClick={handleCloseNav}>Profile</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="userDropdown">
                                                    {state.user.name}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/profile" onClick={handleCloseNav}>Profile</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/orders" onClick={handleCloseNav}>My Orders</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )}
                                        <button className="btn btn-primary py-2 px-4 ms-2" onClick={logout}>Logout</button>
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-primary py-2 px-4 me-2" onClick={handleCloseNav}>Login</Link>
                                <Link to="/register" className="btn btn-primary py-2 px-4 me-2" onClick={handleCloseNav}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

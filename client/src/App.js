import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import AboutPage from './Pages/AboutPage'
import ServicesPage from './Pages/ServicesPage'
import MenuPage from './Pages/MenuPage'
import ContactPage from './Pages/ContactPage'
import TeamPage from './Pages/TeamPage'
import Register from './Pages/Register'
import AddMenuItem from './Pages/AddMenuItem'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import OTP from './Pages/Otp'
import AdminRoute from './AdminRoute'
import Error from './Pages/Error'
import EditMenu from './Pages/EditMenu'

const App = () => {
  return (
      <>
       <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="*" element={<Error />} />




          <Route path="/addmenuitem" element={<AdminRoute><AddMenuItem /></AdminRoute>} />
          <Route path="/editmenuitem" element={<AdminRoute><EditMenu /></AdminRoute>} />

        </Routes>
        <Footer />
      </BrowserRouter>
     
      </>
  )
}

export default App

import React from 'react'
import Hero from '../Components/Hero'
import Services from '../Components/Services'
import AboutSection from '../Components/AboutSection'
import Menu from '../Components/Menu'
import ReservationSection from '../Components/ReservationSection'
import Team from '../Components/Team'
const HomePage = () => {
  return (
    <div class="container-xxl bg-white p-0">
      <Hero />
      <Services />
      <AboutSection />
      <Menu />
      <ReservationSection />
      <Team />
    </div>
  )
}

export default HomePage

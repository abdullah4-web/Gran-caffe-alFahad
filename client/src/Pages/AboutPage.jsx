import React from 'react'
import AboutSection from '../Components/AboutSection'
import Team from '../Components/Team'

const AboutPage = () => {
  return (
    <>
      <div class="container-xxl py-5 bg-dark hero-header mb-5">
        <div class="container text-center my-5 pt-5 pb-4">
          <h1 class="display-3 text-white mb-3 animated slideInDown">About Us</h1>

        </div>
      </div>
      <AboutSection />
      <Team />
    </>
  )
}

export default AboutPage

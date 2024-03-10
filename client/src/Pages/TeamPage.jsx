import React from 'react'
import Team from '../Components/Team'
import AboutSection from '../Components/AboutSection'

const TeamPage = () => {
  return (
    <>
      <div class="container-xxl bg-white p-0">
        <div class="container-xxl py-5 bg-dark hero-header mb-5">
          <div class="container text-center my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">Our Team</h1>
          </div>
        </div>
        <Team />
        <AboutSection />
      </div>
    </>
  )
}

export default TeamPage

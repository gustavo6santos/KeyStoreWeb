import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Upcoming } from '../Components/Upcoming/Upcoming'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'

export const Shop = () => {
  return (
    <div className='App'>
        <Hero/>
        <Popular/>
        <Upcoming/>
        <NewsLetter/>
    </div>
  )
}

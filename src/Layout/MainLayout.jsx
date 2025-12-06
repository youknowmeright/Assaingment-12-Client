import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

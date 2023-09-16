import React from 'react'
import './Admin.scss'
import { AddProducts, Navbar, Orders, ViewProducts } from '../../components'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import OrderDetails from '../../components/admin/orderDetails/OrderDetails'

function Admin() {
  return (
    <div className='admin'>
      {/* Admin */}
    <div className='navbar'>
      <Navbar/>
    </div>
    <div className='content'>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/viewProducts' element={<ViewProducts/>}/>
        <Route path='/addProducts/:id' element={<AddProducts/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/order-details/:id' element={<OrderDetails/>}/>
      </Routes>
    </div>
    </div>
    
  )
}

export default Admin
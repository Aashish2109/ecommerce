import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section>
      <div className='container'>
        <h2>Checkout Successful</h2>
        <p>Thank You</p>
        <br/>
        
          <button><Link to="/order-history">View Order Status</Link></button>
        
      </div>
    </section>
  )
}

export default CheckoutSuccess
import React from 'react'
import styles from './Navbar.module.scss'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../redux/slice/authSlice'
import { NavLink } from 'react-router-dom'


function Navbar() {
  const userName=useSelector(selectUserName);
  const activeLink = ({ isActive }) =>
  (isActive ? `${styles.active}` : "");
  return (
    <div className={styles.navbar}>
    <div className={styles.user}>
      
        <FaUserCircle size={40} color='white'/>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/viewProducts" className={activeLink}>
              View Products
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/addProducts/ADD" className={activeLink}>
              Add Products
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
  
  )
}

export default Navbar
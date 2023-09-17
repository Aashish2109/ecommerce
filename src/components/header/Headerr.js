import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenlink';
import AdminOnlyLink from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';


const logo = (
  <div className='logo'>
    <NavLink to="/">
      <h2>
        AG<span>Shoppe</span>.
      </h2>
    </NavLink>
  </div>
);


const activeLink = ({ isActive }) =>(isActive ? `${styles.active}` : "");

const Headerr = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity=useSelector(selectCartTotalQuantity);

  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY());
  })

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fixedNavBar=()=>{
    if(window.screenY>50){
      setScrollPage(true)
    }
    else{
    setScrollPage(false);
    }
  };
  window.addEventListener("scroll",fixedNavBar)
  //Monitoring Currently Signed User
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        }
        else {
          setdisplayName(user.displayName);
        }


        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        })
        );

      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });

  }, [dispatch, displayName]);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successful");
      navigate('/');
    }).catch((error) => {
      toast.error(error);
    });
  };

  const cart = (
    <span className='cart'>
      <Link to="/cart">Cart</Link>
      <FaShoppingCart size={"20"} />
      <span className='cardCount'>{cartTotalQuantity}</span>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["na-wrapper"]}`}
            onClick={hideMenu}></div>
          <ul onClick={hideMenu}>

            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color={"white"} onClick={hideMenu} />
            </li>

            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button>Admin</button>
                </Link>

              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" classname={activeLink} >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact US
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
    
                <a href='#home' style={{color:"red"}}><FaUserCircle size={16} />
                  Hi, {displayName}</a>
  
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              </ShowOnLogin>


              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>LogOut</NavLink>
              </ShowOnLogin>
            </span>
            {cart}

          </div>

        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}

export default Headerr;
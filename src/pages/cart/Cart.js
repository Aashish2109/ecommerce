import React, { useEffect } from 'react'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../components/Card';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

function Cart() {

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(selectIsLoggedIn);
  const navigate=useNavigate();
  const increaseCart=(cart)=>{
    dispatch(ADD_TO_CART(cart));
  }
  const decreaseCart=(cart)=>{
    dispatch(DECREASE_CART(cart));
  }
  const removeFromCart=(cart)=>{
    dispatch(REMOVE_FROM_CART(cart));
  }
  const clearCart=()=>{
    dispatch(CLEAR_CART());
  }

  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  },[dispatch,cartItems]);


  const url=window.location.href;
  // console.log(url);
  const checkout=()=>{
    if(isLoggedIn){
      navigate("/checkout-details")
    }else{
      dispatch(SAVE_URL(url));
      navigate("/login");
    }

  }
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your Cart Is Empty</p>
            <br />
            <div>
              <Link to='/#products'>
                &larr;Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} 
                        alt={name} 
                        style={{ width: "100px" }} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='' onClick={()=>decreaseCart(cart)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='' onClick={()=>increaseCart(cart)}>+</button>
                        </div>
                      </td>
                      <td>
                        {(price * cartQuantity).toFixed(2)}
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={18} color='red' onClick={()=>removeFromCart(cart)}/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className='' onClick={clearCart}>Clear Cart</button>
              <div className={styles.checout}>
                <div>
                  <Link to="/#products">
                    &larr; Continue Shopping
                  </Link>
                </div>
                <br/>
                <Card cardClass={styles.card}>
                  <p><b>{`Cart Items(s): ${cartTotalQuantity}`}</b></p>
                  <div className={styles.text}>
                    <h4>SubTotal:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax an Shipping calculated at checkout</p>
                  <button onClick={checkout}>Checkout</button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

    </section>
  )
}

export default Cart
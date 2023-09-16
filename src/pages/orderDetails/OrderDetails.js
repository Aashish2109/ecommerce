import React, { useEffect, useState } from 'react'
import styles from './OrderDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../customHooks/useFetchDocument'
import Image from "../../assets/loader.gif"
const OrderDetails = () => {
    const {id}=useParams()
    const [order,setOrder]=useState(null);
    const {document}=useFetchDocument("orders",id);

    useEffect(()=>{
        setOrder(document)
    },[document]);

    
  return (
    <section>
        <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
            <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br/>
        {order===null?(
            <img src={Image} alt="Loading..." style={{width:"50px"}}/>
            ):(
            <>
                <p>
                    <b>Order ID</b>{order.id}
                </p>
                <p>
                    <b>Order Amount</b>${order.orderAmount}
                </p>
                <p>
                    <b>Order Status</b>{order.orderStatus}
                </p>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItems.map((cart,index)=>{
                            const {id,name,price,imageURL,cartQuantity}=cart;
                            return(
                                <tr key={id}>
                                <td>
                                    <b>{index+1}</b>
                                </td>
                                <td>
                                    <p>{name}</p>
                                    <img src={imageURL} alt={name} style={{width:"100px"}}/>
                                </td>
                                <td>
                                   {price}
                                </td>
                                <td>
                                    {cartQuantity}
                                </td>
                                <td>
                                    <p>{(price*cartQuantity).toFixed(2)}</p>
                                </td>
                                <td className={styles.icons}>
                                <button>
                                    <Link to={`/review-product/${id}`}>
                                        Review Product
                                    </Link>
                                </button>

                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
            )}
        </div>
    </section>
  )
}

export default OrderDetails
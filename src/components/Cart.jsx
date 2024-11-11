import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeProduct, clearCart } = useContext(AppContext)
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate();

  // calculate the total qty and price of the cart
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
      setPrice(price);
      setQty(qty);
    }
  }, [cart])

  return (
    <>

 {cart?.items?.length > 0 ? (
        <>
        <div className="my-5 text-center">
            <button className="btn btn-info mx-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total Qty : {qty}</button>
            <button className="btn btn-warning mx-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total price : {price}{" "}{"₹"}</button>
          </div>
        </>
      ) : (
        <>
            <div className="text-center my-5">
          <button className="btn btn-warning mx-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }} onClick={()=>navigate('/')}>Continue Shopping...</button>
          </div>
        </>
      )} 


      {cart?.items?.map((product) => <div key={product._id} className='container bg-dark my-5 p-3 text-center' style={{ alignItems: 'center', width: '100%' }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around', alignItems: 'center'
        }}> <div className="cart_img">
            <img src={product.imageSrc} alt='' style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
          </div>

          <div className="cart_des" style={{ width: '500px' }}>
            <h2>{product.title}</h2>
            <h4>{product.price}{" "}{"₹"}</h4>
            <h4>Qty:{" "}{product.qty}</h4>
          </div>

          <div className="cart_action">
            <button className="btn btn-warning mx-2" style={{ fontWeight: 'bold' }} onClick={() => decreaseQty(product?.productId, 1)}>Qty--</button>

            <button className="btn btn-info mx-2" style={{ fontWeight: 'bold' }} onClick={() => addToCart(
              product?.productId,
              product.title,
              product.price / product.qty,
              1,
              product.imageSrc
            )}>Qty++</button>

            <button className="btn btn-danger mx-2" style={{ fontWeight: 'bold' }} onClick={() => {
              if (confirm("Are you sure, want to remove from cart...?")) {
                removeProduct(product?.productId)
              }
            }}>remove{" "}</button>
          </div>

        </div>
      </div>)}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-5" >
          <button className="btn btn-warning mx-3 " style={{ fontWeight: 'bold' }} onClick={() => navigate('/shipping')}>CheckOut
          </button>
          <button className="btn btn-danger mx-3" style={{ fontWeight: 'bold' }} onClick={() => {
            if (confirm("Are you sure,want to clear cart....?")) {
              clearCart()
            }
          }} >Clear Cart</button>
        </div>
      )}

    </>
    // <div>Cart</div>
  );
};

export default Cart
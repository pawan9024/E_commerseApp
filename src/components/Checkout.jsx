import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import TableProduct from './TableProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const { cart, userAddress, url, user ,clearCart} = useContext(AppContext);

  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

   const  nevigate = useNavigate();

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

  const handlePayment = async () => {
    try {
      // Make sure the URL is correct and exists
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty:qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      console.log("Order response", orderResponse);

      const { orderId, amount:orderAmount } = orderResponse.data;

    //   // Razorpay payment integration
    const options = {
      "key": "rzp_test_u6KZDRNKhQ6tYk", // Enter the Key ID generated from the Dashboard
      "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "CheckMart",
      "description": "Check Mart",
      // "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
        const paymentData = {
          orderId:response.razorpay_payment_id,
          paymentId:response.razorpay_order_id,
          signature:response.razorpay_signature,
          amount:orderAmount,
          orderItems:cart?.items,
          userId:user._id,
          userShipping:userAddress
        }

        const api = await axios.post(`${url}/payment/verify-payment`,paymentData)
         
        if(api.data.success){
          clearCart();
          nevigate('/orderconfirmation');
        }
       
      },
      "prefill": {
          "name": "Amit Yadav",
          "email": "yadavamit34996@gmail.com",
          "contact": "9696739213"
      },
      "notes": {
          "address": "Gyanpur, Bhadohi,Uttar Pradesh"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
  
    } catch (error) {
      console.error(
        "Payment error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: 'bold' }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>PinCode: {userAddress?.pincode}</li>
                  <li>Nearby: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: 'bold' }}
          onClick={handlePayment}
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;

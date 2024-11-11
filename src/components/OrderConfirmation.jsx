import React, { useContext, useEffect,useState} from 'react'
import AppContext from '../context/AppContext'
import ShowOrderProduct from './product/ShowOrderProduct'

const OrderConfirmation = () => {
  const {userOrder} = useContext(AppContext)

 const [latestOrder, setLatestOrder] = useState({})
 
 useEffect(() => {
     if(userOrder){
      setLatestOrder(userOrder[0]);
     }
 }, [userOrder])
 
//  console.log("latest order",latestOrder)

  return (
    <>
    <div className="container my-5">
      <h1 className='text-center'>Your order has been confirmed,</h1>
      <h3 className='text-center'>It will delivered soon</h3>
    </div>

    <div className="container ">

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
               OrderItems
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                OrderDetails & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <ShowOrderProduct items = {latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: 'bold' }}>
                <li>OrderId: {latestOrder?.orderId}</li>
                  <li>PaymentId: {latestOrder?.paymentId}</li>
                  <li>PaymentStatus: {latestOrder?.payStatus}</li>
                  <li>Name: {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country: {latestOrder?.userShipping?.country}</li>
                  <li>State: {latestOrder?.userShipping?.state}</li>
                  <li>PinCode: {latestOrder?.userShipping?.pincode}</li>
                  <li>Nearby: {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: 'bold' }}>
          Proceed to Pay
        </button>
      </div> */}
     
    </>
  )
}

export default OrderConfirmation
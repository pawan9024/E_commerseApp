import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
useNavigate
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
  const { shippingAddress,userAddress } = useContext(AppContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    phoneNumber:""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
  }

   // destructuring data 
  const { fullName,address,city,state,country,pincode,phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (!fullName || !address || !city || !state || !country || !pincode || !phoneNumber ) {
    //   toast.error("All fields are required!", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     transition: Bounce,
    //   });
    //   return;
    // }
    
    const result = await shippingAddress (fullName,address,city,state,country,pincode,phoneNumber);

    if (result.success) {
      navigate('/checkout');
    }

    setFormData({
      fullName:"",
      address:"",
      city:"",
      state:"",
      country:"",
      pincode:"",
      phoneNumber:""
    })
    console.log(formData) 
  }
  return (
    <>
      <div className="container my-5 p-5" style={{ border: "2px solid yellow", borderRadius: "10px" }} >
        <h1 className='text-center'>Shipping Address</h1>
        <form onSubmit={submitHandler}
          className='my-3'>

         <div className="row">
         <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">FullName</label>
            <input name="fullName" value={formData.fullName} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail3" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input name="country" value={formData.country} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="current-password" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">State</label>
            <input name="state" value={formData.state} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputPassword1" autoComplete="current-password" />
          </div>
         </div>

         <div className="row">
         <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">City</label>
            <input name="city" value={formData.city} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail3" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Pincode</label>
            <input name="pincode" value={formData.pincode} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="current-password" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="exampleInputPassword1" autoComplete="current-password" />
          </div>
         </div>

       <div className="row">
       <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">AddressLine/Nearby</label>
            <textarea name="address" value={formData.address} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputPassword1" autoComplete="current-password" />
          </div>
       </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary" style={{fontWeight:'bold'}}>Submit</button>
          </div>

          {userAddress && (
             <div className="d-grid col-6 mx-auto my-3">
             <button type="submit" className="btn btn-warning" onClick={()=>navigate('/checkout')} style={{fontWeight:'bold'}}>Use Old Address</button>
           </div>
          )}
         
        </form>
      </div>
    </>

    // <div>Register</div>
  )
}

export default Address
import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
useNavigate
import { ToastContainer, toast ,Bounce} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login =  () => {
    const {login} = useContext(AppContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email:"",
      password:""
    })

  const onChangeHandler = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value} )
  }
  const {email,password} = formData;
  const submitHandler = async(e)=>{
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
      return;
  }

   const result =  await login(email,password);

   if(result.success){
    navigate('/');
   }
};
  return (
    <>
      <div className="container my-5 p-5" style={{ width: "500px", border: "2px solid yellow", borderRadius: "10px" }} >
        <h1 className='text-center'>User Login</h1>
        <form onSubmit={submitHandler}
        className='my-3'>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input name="email" value={formData.email} onChange={onChangeHandler}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="current-password"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name="password" value={formData.password} onChange={onChangeHandler}  type="password" className="form-control" id="exampleInputPassword1" autoComplete="current-password" />
          </div>
          <div className="d-grid col-6 mx-auto my-3">
          <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>

    // <div>Register</div>
  )
}

export default Login
import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './components/product/ShowProduct'
  import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
  import ProductDetail from './components/product/ProductDetail';
  import Navbar from './components/Navbar';
  import SearchProduct from './components/product/SearchProduct';
  import Register from './components/user/Register';
  import Login from './components/user/Login';

  import { ToastContainer, toast ,Bounce} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/user/Profile';
import Cart from './components/Cart';
import Address from './components/Address';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';




const App = () => {
  //  const {data} = useContext(AppContext)
  return (
  // it would show in home page
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        {/* home page */}
        <Route path="/" element={<ShowProduct/>}/>
        {/* it is for the product details */}
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/product/search/:term" element={<SearchProduct/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Address/>}/>
        <Route path="/checkOut" element={<Checkout/>}/>
        <Route path="/orderconfirmation" element={<OrderConfirmation/>}/>
      </Routes>
    </Router>

  )
}

export default App
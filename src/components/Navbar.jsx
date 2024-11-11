import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  // console.log("user cart",cart)

  const filterByCategory = (cat) => {
    setFilteredData(products.filter((data) => data.category.toLowerCase() == cat.toLowerCase()))
  }

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price))
  }

  const submitHandler = (e) => {
    // to prevent default behaviour of reload on entering data
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    // after search search box would emptied but i don't want so i am commenting it
    // setSearchTerm("")
  }
  return (
    <div className="nav sticky-top">

      <div className="nav_bar">
        <Link to={'/'} className="left" style={{ textDecoration: 'none', color: 'white' }}>
          <h3>CHECKMART</h3>
        </Link>
        <form className="search_bar" onSubmit={submitHandler} >
          <span className=" material-symbols-outlined">search</span><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search Products....." />
        </form>
        <div className="right">

          {isAuthenticated && (
            <>
              <Link to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
              
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>

                {cart?.items?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.items.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}

              </Link>

              <Link to={'/profile'} className="btn btn-primary mx-3">Profile</Link>
              <button className="btn btn-danger mx-3" onClick={() => {
                logout();
                navigate('/')
              }}>LogOut</button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to={'/login'} className="btn btn-info mx-3">Login</Link>
              <Link to={'/register'} className="btn btn-info mx-3">Register</Link>
            </>
          )}

        </div>
      </div>

      {location.pathname == '/' && (
        <div className="sub_bar" >
          <div className="items" onClick={() => setFilteredData(products)}>No Filter</div>
          <div className="items" onClick={() => filterByCategory("mobiles")}>Mobiles</div>
          <div className="items" onClick={() => filterByCategory("laptops")}>Laptops</div>
          <div className="items" onClick={() => filterByCategory("cameras")}>Cameras</div>
          <div className="items" onClick={() => filterByCategory("headphones")}>Headphones</div>
          <div className="items" onClick={() => filterByPrice(15999)}>{"₹"}{" "}15999</div>
          <div className="items" onClick={() => filterByPrice(25999)}>{"₹"}{" "}25999</div>
          <div className="items" onClick={() => filterByPrice(49999)}>{"₹"}{" "}49999</div>
          <div className="items" onClick={() => filterByPrice(69999)}>{"₹"}{" "}69999</div>
          <div className="items" onClick={() => filterByPrice(89999)}>{"₹"}{" "}89999</div>
        </div>
      )}

    </div>
    // <div>Navbar</div>
  )
}

export default Navbar
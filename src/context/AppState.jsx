import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {

    const url = "http://localhost:3000/api"

    // backend API
    // const url = "https://checkmart-mern-e-commerce-project-api.onrender.com/api"


    const [products, setProducts] = useState([])
    const [token, setToken] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState((false))
    const [filteredData,setFilteredData] = useState([])
    const [user, setUser] = useState()
    const [cart, setCart] = useState([]) 
    const [reload, setReload] = useState(false) 
    const [userAddress, setUserAddress] = useState("")  
    const [userOrder, setUserOrder] = useState([])  
    


    useEffect(() => {

        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });
            console.log(api.data.products);
            setProducts(api.data.products);
            setFilteredData(api.data.products);
            userProfile();
        };
        fetchProduct();
        userCart();
        getAddress();
        user_Order();

    }, [token,reload]);

    useEffect(() => {
        let lstoken = localStorage.getItem('token')
        // console.log("ls token",lstoken)
        if(lstoken){
            setToken(lstoken);
        setIsAuthenticated(true)
        }
    }, [])
    

    // register user
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`, { name, email, password }, {
            // The third argument includes headers (telling the server that the request body contains JSON data) and withCredentials: true (to include cookies for authentication, if required).
            headers: {
                "Content-Type": "Application/json",
            },
            withCredentials: true,
        });

        toast.success(api.data.message, {
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

        //console.log("user register",api.data)
        return api.data;
        //     alert(api.data.message);
    };

    // login user
    const login = async (email, password) => {
        try {
            const api = await axios.post(`${url}/user/login`, { email, password }, {
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });

            toast.success(api.data.message, {
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

            // console.log("user login", api.data);
            setToken(api.data.token);
            setIsAuthenticated(true)
            // save token to the local storage
            localStorage.setItem('token',api.data.token)
            return api.data;

        } catch (error) {
            // Check if error has a response (server-side error)
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return { success: false };  // Return a failure status
        }
    };


     // logout user
     const logout = async (email, password) => {

       setIsAuthenticated(false);
       setToken("")
       localStorage.removeItem('token')
       toast.success("LogOut successfully...!", {
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

     }

    //  user profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        // console.log("user Profile",api.data);
       setUser(api.data.user)
    };

    // add to cart
    const addToCart = async (productId,title,price,qty,imageSrc) => {
        const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imageSrc}, {
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        //  if true then false and vice-versa
         setReload(!reload)

        // console.log("my cart",api);  //to check data in console
        toast.success(api.data.message, {
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

    };

    //  user cart
    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        // console.log("user cart",api.data.cart)
        setCart(api.data.cart)
    };

    // qty-- 
    const decreaseQty = async (productId,qty) => {
        const api = await axios.post(`${url}/cart/--qty`,{productId,qty} ,{
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast.success(api.data.message, {
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

        // console.log("user cart",api.data.cart)
        // setCart(api.data.cart)
    };

    // qty++
      const increaseQty = async (productId,qty) => {
        const api = await axios.post(`${url}/cart/--qty`,{productId,qty} ,{
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast.success(api.data.message, {
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

        // console.log("user cart",api.data.cart)
        // setCart(api.data.cart)
    };

     // remove product
     const removeProduct = async (productId) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`,{
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast.success("removed item from", {
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

        // console.log("user cart",api.data.cart)
        // setCart(api.data.cart)
    };

    // clear cart
    const clearCart = async (productId) => {
        const api = await axios.delete(`${url}/cart/clear`,{
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast.success("cart cleared", {
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

        // console.log("user cart",api.data.cart)
        // setCart(api.data.cart)
    };

    
    // add shipping address
    const shippingAddress = async (fullName,address,city,state,country,pincode,phoneNumber ) => {
        const api = await axios.post (`${url}/address/add`,{fullName,address,city,state,country,pincode,phoneNumber},{
            headers: {
                "Content-Type": "Application/json",
                "Auth":token
            },
            withCredentials: true,
        });
        setReload(!reload)
        toast.success(api.data.message, {
            position:"bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data

        // console.log("user cart",api.data.cart)
        // setCart(api.data.cart)
    };

    // get user latest address
    const getAddress = async () => {
        const api = await axios.get(`${url}/address/get`, {
            headers: {
                "Content-Type": "Application/json",
                "auth":token
            },
            withCredentials: true,
        });
        // console.log("user Address",api.data.userAddress);
        setUserAddress(api.data.userAddress)
        
    };

        // get user order
        const user_Order = async () => {
            const api = await axios.get(`${url}/payment/userorder`, {
                headers: {
                    "Content-Type": "Application/json",
                    "auth":token
                },
                withCredentials: true,
            });
            // console.log("user order",api.data);
            setUserOrder(api.data)
            
        };
        console.log("user order = ",userOrder)


    return (
        <AppContext.Provider value={{ products, register, login, url, setIsAuthenticated, isAuthenticated ,filteredData,setFilteredData,logout,user,addToCart,cart,decreaseQty,increaseQty,removeProduct,clearCart,shippingAddress,userAddress,userOrder}}>{props.children}</AppContext.Provider>
    )
}

export default AppState
import React, { useContext, useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom'
import axios from 'axios'
import RelatedProducts from './RelatedProducts';
import AppContext from '../../context/AppContext';

const ProductDetail = () => {
 
   const {addToCart} = useContext(AppContext)

  const {id} = useParams();

  const url = "http://localhost:3000/api"

  const [product, setProduct] = useState()
  
  useEffect(() => {

      const fetchProduct = async () => {
          const api = await axios.get(`${url}/product/${id}`, {
              headers: {
                  "Content-Type": "Application/json",
              },
              withCredentials: true,
          });
        //   console.log(api.data.product);
          setProduct(api.data.product);
      };
      fetchProduct();

  }, [id])

  return (
     <>
     <div className="container text-center my-5 " style={{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'
     }}>
        <div className="left">
           <img src={product?.imageSrc} alt='' style={{width:'250px',height:'250px', borderRadius:'10px',border:'2px solid yellow'}}/>
        </div>
        <div className="right">
           <h1>{product?.title}</h1>
           <p>{product?.description}</p>
           <h1>{product?.price}{" "}{"₹"}</h1>
           
           <div className='my-5'>
           <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Buy Now</button>
           <button className='btn btn-warning' onClick={()=> addToCart(
                      product._id,
                       product.title,
                       product.price,
                       1,
                       product.imageSrc
                    )}  style={{fontWeight:'bold'}}>Add to Cart</button>
           </div>
           
        </div>
     </div>

    <RelatedProducts category={product?.category}/>

     </>
    // <div>ProductDetail={id}</div>
  )
}

export default ProductDetail
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const RelatedProducts = ({category}) => {

    const {products,addToCart} = useContext(AppContext)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
  setRelatedProduct(
    products.filter((data) => data?.category?.toLowerCase() === category?.toLowerCase())
  );
}, [category, products]);

    
  return (
    <div className="container text-center">
        <h1>Related Product</h1>

    {/* all show product of related category */}
        <div className="container d-flex justify-content-center align-items-center "> {/* Wrap everything in a Bootstrap container */}
  <div className="row container d-flex justify-content-center align-items-center my-5">
    {relatedProduct?.map((product) => (
      <div key={product._id} className=" col-md-4 my-3 d-flex justify-content-center align-items-center"> {/* Adjust to col-md-3 for 4 cards per row */}
        <div className="card bg-dark text-light text-center" style={{ width: '18rem' }}>
          <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
            <img
              src={product.imageSrc}
              className="card-img-top"
              alt="..."
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "10px",
                border: "2px solid yellow",
              }}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>

           <div className="my-3" >
           <button className="btn btn-primary mx-3">{product.price}{" "}{"₹"}</button>
           <button className="btn btn-warning" onClick={()=> addToCart(
                      product._id,
                       product.title,
                       product.price,
                       1,
                       product.imageSrc
                    )} style={{fontWeight:'bold'}}>Add to cart</button>
            </div>

          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>

    // <div>RelatedProducts</div>


  )
}
 
export default RelatedProducts
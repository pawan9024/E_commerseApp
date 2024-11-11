// import React, { useContext } from 'react'
// import AppContext from '../../context/AppContext'
// import { Link } from 'react-router-dom'

// const ShowProduct = () => {
//   const { products, filteredData, addToCart } = useContext(AppContext)

//   return (
//     <div className="container my-5"> {/* Wrap everything in a Bootstrap container */}
//       <div className="row g-5"> {/* Add a gap of 3 or 5 between cards */}
//         {filteredData?.map((product) => (
//           <div key={product._id} className="col-md-3 d-flex justify-content-center"> {/* 4 cards per row */}
//             <div className="card bg-dark text-light text-center" style={{ width: '18rem' }}>
//               <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
//                 <img
//                   src={product.imageSrc}
//                   className="card-img-top"
//                   alt={product.title}
//                   style={{
//                     width: "200px",
//                     height: "200px",
//                     borderRadius: "10px",
//                     border: "2px solid yellow",
//                   }}
//                 />
//               </Link>
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">{product.description}</p>
//                 <div className="my-3">
//                   <button className="btn btn-primary mx-3">{product.price} ₹</button>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => addToCart(
//                       product._id,
//                       product.title,
//                       product.price,
//                       1,
//                       product.imageSrc
//                     )}
//                     style={{ fontWeight: 'bold' }}
//                   >
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ShowProduct













import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext)

  return (
    <div className="container my-5"> {/* Wrap everything in a Bootstrap container */}
      <div className="row g-5"> {/* Add a gap of 5 between cards */}
        {filteredData?.map((product) => (
          <div key={product._id} className="col-md-3 d-flex justify-content-center"> {/* 4 cards per row */}
            <div className="card bg-dark text-light text-center d-flex flex-column" style={{ width: '18rem', height: '100%' }}>
              <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                <img
                  src={product.imageSrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>

                {/* Push the buttons to the bottom */}
                <div className="mt-auto my-3 d-flex justify-content-center">
                  <button className="btn btn-primary mx-3">{product.price} ₹</button>
                  <button
                    className="btn btn-warning"
                    onClick={() => addToCart(
                      product._id,
                      product.title,
                      product.price,
                      1,
                      product.imageSrc
                    )}
                    style={{ fontWeight: 'bold' }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowProduct



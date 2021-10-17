import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";

import { getProductsByCount } from "../functions/product";

// Import AliceCarousel React components
import AliceCarousel from 'react-alice-carousel';

// Import AliceCarousel styles
import 'react-alice-carousel/lib/alice-carousel.css';

// Breakpoints
const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4},
    1440: { items: 5}
};


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <h1>HOME</h1>
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <div className="loading-image">
            <img
              src="https://res.cloudinary.com/sale01/image/upload/v1623307453/assets/loading.gif"
              className="loading-centered"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <AliceCarousel  
        className="aliceCarousel"
        mouseTracking
        //   items={items}
          responsive={responsive}
          controlsStrategy="default"
          >
         
        {products.map((product) => (
          
        
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
      
        ))}
      </AliceCarousel>
    </>
  );
};

export default Home;

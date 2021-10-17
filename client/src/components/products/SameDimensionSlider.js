import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../cards/ProductCard";
import { sizeSearch } from "../../functions/product";
import Loader from "../loader/Loader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination, Navigation]);

const SameDimensionSlider = ({ product }) => {
  const { width, height, rim } = product;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("WWWIDDITH", product);
    loadProducts();
  }, []);

  console.log();

  const loadProducts = () => {
    setLoading(true);
    sizeSearch(width, height, rim).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const toTop = () => {
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  };

  return (
    <>
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <Loader />
        ) : (
          <></>
        )}
      </div>

      <div className="mySwiper mySameSizeSwiper">
        <h4>GUME U ISTOJ DIMENZIJI</h4>
        <Swiper
          className="same-dimension-slider"
          observer
          centerInsufficientSlides={true}
          dynamicBullets={true}
          dynamicMainBullets={3}
          direction={"horizontal"}
          navigation={true}
          // slidesPerView={4}
          // spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1680: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
            1920: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div key={product._id}>
                <Link to={`/product/${product.slug}`}>
                  <ProductCard
                    key={product._id}
                    product={product}
                    onClick={setTimeout(toTop, 1000)}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SameDimensionSlider;

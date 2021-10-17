import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../cards/ProductCard";
import { getPosebnaPonuda } from "../../functions/product";
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

const SpecialOfferSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosebnaPonuda();
  }, []);

  const loadPosebnaPonuda = () => {
    setLoading(true);
    getPosebnaPonuda().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
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

      <div className="mySwiper">
        <h4>Posebna ponuda</h4>
        <Swiper
          className="special-offer-slider"
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
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div key={product._id}>
                <Link to={`/product/${product.slug}`}>
                  <ProductCard key={product._id} product={product} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SpecialOfferSlider;

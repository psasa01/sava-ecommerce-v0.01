import React, { useLayoutEffect, useState } from "react";
import { getProduct } from "../functions/product";

import Loader from "./../components/loader/Loader";

import SingleProductCard from "../components/cards/SingleProductCard";
import SameDimensionSlider from "../components/products/SameDimensionSlider";

import slugify from "slugify";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { slug } = match.params;

  useLayoutEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    setLoading(true);

    setTimeout(() => {
      getProduct(slug).then((res) => setProduct(res.data));
      setLoading(false);
    }, 600);
  };

  //
  return (
    <>
      {!product.brand ? (
        <div className="loading-container" onclick="return false;">
          {/* // <LoadingOutlined style={{ color: "red" }} /> */}
          <Loader />
        </div>
      ) : (
        <div className="">
          <SingleProductCard product={product} />
          <SameDimensionSlider product={product} />

          <br />
        </div>
      )}
      <div className="">{product.width}</div>
    </>
  );
};

export default SingleProduct;

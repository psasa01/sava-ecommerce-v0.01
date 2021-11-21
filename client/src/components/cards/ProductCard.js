import React from "react";
// import { Card, Popconfirm } from "antd";
import slugify from "slugify";
// import placeholder from "../../images/placeholder.jpg";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// const { Meta } = Card;

import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, handleRemove }) => {
  // destructure
  const {
    _id,
    brand,
    title,
    price,
    discount,
    width,
    height,
    rim,
    images,
    loadindex,
    speedindex,
    // slug,
    posebnaPonuda,
  } = product;
  const discountPercent = discount;
  const discountPrice = price - (price * discount) / 100;

  const defaultProductImage =
    `../../images/products/${slugify(title.toLowerCase())}.jpg` ||
    "https://res.cloudinary.com/sale01/image/upload/v1637453169/assets/product-placeholder.jpg";

  return (
    <AnimatePresence>
      <motion.div
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        exit={{ opacity: 0 }}
        className="full-product"
      >
        <div
          className={`${slugify(brand.toLowerCase())} product-card`}
          style={{ width: "100%" }}
          //   cover={<img alt={title} src={images[0].url} className="m-2" />}
        >
          <img
            className={`${slugify(brand.toLowerCase())}-logo brand-logo`}
            src={`../../images/${slugify(brand.toLowerCase())}-100px.jpg`}
            alt=""
          />
          <div className="discount-percent">
            <h3>-{discountPercent}%</h3>
          </div>
          <div className="product-image">
            {posebnaPonuda ? (
              <div className="posebna-ponuda">POSEBNA PONUDA</div>
            ) : (
              <div></div>
            )}
            <img
              src={
                images && images.length ? images[0].url : defaultProductImage
              }
              alt=""
            />
          </div>
          {/* <Meta
        title={`${width}/${height}R${rim} - ${title}`}
        description={`${price}KM`}
      /> */}
          <div className="product-description">
            <h3 className="tyre-dimension">{`${width}/${height}R${rim} ${loadindex}${speedindex}`}</h3>
            <h3 className="tyre-name">{title}</h3>
            <h3 className="tyre-price">
              <span className="full-price">{`${price.toFixed(2)}KM`}</span>
              <span>&nbsp;&nbsp;</span>
              <span className="discount">{discountPrice.toFixed(2)}KM</span>
            </h3>
          </div>
        </div>

        <div className="card-actions"></div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ProductCard;

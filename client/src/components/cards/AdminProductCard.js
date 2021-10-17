import React from "react";
import { Card, Popconfirm } from "antd";
import slugify from "slugify";
// import placeholder from "../../images/placeholder.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const {
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
    slug,
    posebnaPonuda,
  } = product;
  const discountPercent = discount;
  const discountPrice = price - (price * discount) / 100;

  const defaultProductImage = `../../images/products/${slugify(
    title.toLowerCase()
  )}.jpg`;

  function cancel(e) {
    // console.log(e);
    // message.error("Click on No");
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ delay: 0.004441, duration: 1 }}
      className="full-product"
    >
      <Link to={`/product/${slug}`}>
        <div
          className={`${slugify(brand.toLowerCase())} product-card`}
          style={{ width: "100%" }}
          onClick={{}}
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
            <img src={defaultProductImage} alt="" />
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
      </Link>
      <div className="card-actions">
        {/* <span className="brand-name">{brand}</span> */}

        <Popconfirm
          title="Da li ste sigurni da želite izbrisati proizvod?"
          onConfirm={() => handleRemove(slug)}
          onCancel={cancel}
          okText="Obriši"
          cancelText="Zatvori"
        >
          <a className="btn-delete">
            <DeleteOutlined />
          </a>
        </Popconfirm>

        {/* <button className="btn-delete" onClick={() => handleRemove(slug)}>
              <DeleteOutlined />
            </button> */}

        {/* <div
              className="btn-delete btn btn-danger"
              onClick={() => handleRemove(slug)}
            >
              <DeleteOutlined />
            </div> */}

        <Link className="btn-edit" to={`/admin/product/${slug}`}>
          {" "}
          <EditOutlined />
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminProductCard;

import React, { useState, useEffect } from "react";
import slugify from "slugify";
import _ from "lodash";

import { motion } from "framer-motion";

import tyreDesc from "../../tyreDesc";
import { Popconfirm } from "antd";

import { useSelector, useDispatch } from "react-redux";

const SingleProductCard = ({ product }) => {
  const {
    brand,
    title,
    width,
    height,
    rim,
    dot,
    producedin,
    fuel,
    wetGrip,
    noise,
    loadindex,
    speedindex,
    price,
    discount
  } = product;

  const discountPercent = discount;
  const discountPrice = price - (price * discount) / 100;

  const [count, setCount] = useState(1);
  const [existingCart, setExistingCart] = useState([]);
  const [duplicateProduct, setDuplicateProduct] = useState(null);

  useEffect(() => {
    // ponisti dupli proizvod
    setDuplicateProduct(null);
    // if cart is in local storage, GET it
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      // console.log("jaraniko ovdje vec ima kart na samom pocetku");
      setExistingCart(cartFromStorage);
      // console.log("pocetni cart", existingCart);
      let doubleProduct = _.find(cartFromStorage, { _id: product._id });
      console.log("dprd", doubleProduct);

      setDuplicateProduct(doubleProduct);
    }
  }, [setDuplicateProduct, setExistingCart]);

  // redux
  const { user, cart } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  const descriptionText = tyreDesc[slugify(title).toLowerCase()]
    ? tyreDesc[slugify(title).toLowerCase()].split("\n").map(i => {
        return <li>{i}</li>;
      })
    : "";

  const brandCss = brand ? slugify(brand.toLowerCase()) : "";
  const defaultProductImage = title
    ? `../../images/products/${slugify(title.toLowerCase())}.jpg`
    : "";

  const fuelImage = fuel ? `../../images/labels/fuel-${fuel}.png` : "";
  const wetImage = wetGrip ? `../../images/labels/rain-${wetGrip}.png` : "";
  const noiseImage =
    noise < 69
      ? `../../images/labels/noise_a.png`
      : `../../images/labels/noise_b.png`;
  const fuelUp = fuel ? fuel.toUpperCase() : "";
  const wetUp = wetGrip ? wetGrip.toUpperCase() : "";

  let fuelText = "";
  fuel === "a"
    ? (fuelText = "Veoma nizak otpor kotrljanju, maksimalna ušteda goriva")
    : fuel === "b"
    ? (fuelText = "Nizak otpor kotrljanju, znatna ušteda goriva")
    : fuel === "c"
    ? (fuelText = "Standardan otpor kotrljanju, standardna potrošnja goriva")
    : fuel === "d"
    ? (fuelText = "Povišen otpor kotrljanju, povečana potrošnja goriva")
    : fuel === "e"
    ? (fuelText = "Veoma visok otpor kotrljanju, mnogo veča potrošnja")
    : fuel === "f"
    ? (fuelText = "Loše")
    : fuel === "g"
    ? (fuelText = "Veoma loše")
    : (fuelText = "");

  let wetGripText = "";
  wetGrip === "a"
    ? (wetGripText = "Izvrsno")
    : wetGrip === "b"
    ? (wetGrip = "Vrlo dobro")
    : wetGrip === "c"
    ? (wetGripText = "Dobro")
    : wetGrip === "d"
    ? (wetGripText = "Prosječno")
    : wetGrip === "e"
    ? (wetGripText = "Ispodprosječno")
    : wetGrip === "f"
    ? (wetGripText = "Loše")
    : wetGrip === "g"
    ? (wetGripText = "Veoma loše")
    : (wetGripText = "");

  const quant = document.getElementById("quantity");

  const handleQuantityDecrease = () => {
    if (count === 1) {
      let count = 1;
    } else {
      setCount(parseInt(count - 1));
      console.log(quant.value);
      console.log(count);
    }
  };

  const handleQuantityIncrease = () => {
    setCount(parseInt(count + 1));
  };

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    let cart1 = [];

    if (typeof window !== "undefined") {
      // if cart is in local storage, GET it
      if (localStorage.getItem("cart")) {
        console.log(
          "ovdje ima cart i zato sad gledam ima li istog producta u njemu"
        );
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log("evo cart iz memorije", cart);
        let product1 = _.find(cart, { _id: product._id });

        if (product1 !== undefined) {
          console.log("evo imam taj produkt", product1);
          setDuplicateProduct(product);
          let newCount = parseInt(count) + parseInt(product1.count || 0);
          console.log("noviCount", newCount);
          product1 = { ...product, count: newCount };
          console.log("noviProduct", product1);

          cart1 = cart.filter(obj => {
            return obj._id != product._id;
          });
          product1 = {};
          console.log("evo novi cart", cart1);

          cart1.push({ ...product, count: newCount });

          localStorage.setItem("cart", JSON.stringify(cart1));
          setCount(1);
          console.log("dodano!!!");

          // add to redux state
          dispatch({
            type: "ADD_TO_CART",
            payload: cart1
          });
        } else {
          console.log("nema ti ovog proizvoda jaro");
          setDuplicateProduct(product);
          cart.push({ ...product, count: count });
          console.log("evo cart s dodanim proizvodom", cart);
          localStorage.setItem("cart", JSON.stringify(cart));
          console.log("dodano!!!");
          setCount(1);

          // add to redux state
          dispatch({
            type: "ADD_TO_CART",
            payload: cart
          });
        }
      } else {
        // push product to duplicate
        setDuplicateProduct(product);
        // push the product to cart if no cart in memory

        console.log("nema carta ali evo sad ce biti");

        cart.push({ ...product, count: count });
        console.log("ccaarrtt", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        setCount(1);
        console.log("dodano!!!");

        // add to redux state
        dispatch({
          type: "ADD_TO_CART",
          payload: cart
        });
      }
    }
  };

  function cancel(e) {
    // console.log(e);
    // message.error("Click on No");
  }

  return (
    <>
      <motion.div
        style={{ opacity: "0" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.005, duration: 1 }}
        className="full-single-product"
      >
        <div className={`single-product-image`}>
          <img src={defaultProductImage} alt="" />
          <h3>{`${width}/${height}R${rim} ${loadindex}${speedindex.toUpperCase()}`}</h3>
          <h4>{title}</h4>
          <div className="brand-logo-container">
            <img
              src={`../../images/${slugify(brand.toLowerCase())}-100px.jpg`}
              alt=""
              className="single-product-brand-logo"
            />
          </div>
        </div>
        <div className={`${brandCss}-content single-product-content`}>
          <h3>
            {width}/{height}R{rim} {loadindex}
            {speedindex.toUpperCase()}
          </h3>
          <h4 className="single-product-content-h4-title">{title}</h4>
          <div className="br">
            <br />
          </div>
          <h4 className="dot-h4">DOT {dot}</h4>
          <h4 className="producedin-h4">
            Zemlja porijekla:{" "}
            <span style={{ color: "#0091d2" }}>{producedin}</span>
          </h4>
          <div className="labels-table">
            <table style={{}}>
              <tr>
                <td class="table-left">{fuelUp}&nbsp;&nbsp;</td>

                <td>{fuelText}</td>
              </tr>
              <tr>
                <td class="table-left">{wetUp}&nbsp;&nbsp;</td>
                <td>{wetGripText} prijanjanje na mokroj podlozi</td>
              </tr>
              <tr>
                <td class="table-left">{noise}dB&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>Smanjena buka</td>
              </tr>
            </table>
          </div>
          <div className="single-product-description">
            <ul>{descriptionText}</ul>
          </div>
        </div>
        <div className="label-container">
          <div className="labels">
            <div className="wet-fuel">
              <img className="fuel-image" src={fuelImage} alt={fuel} />
              <img className="wet-image" src={wetImage} alt={wetGrip} />
            </div>
            <div className="noise-image-container">
              <img src={noiseImage} alt="" className="noise-image" />
              <h4>{noise}dB</h4>
            </div>
          </div>
          <div className="price-container">
            <div className="price-labels-container">
              <div className="percent-label">
                <h2>-{discount}%</h2>
              </div>
              <div className="full-price-label">
                <h3>&nbsp;{parseFloat(price).toFixed(2)}KM&nbsp;</h3>
              </div>
              <div className="discount-price-label">
                <h2>{parseFloat(discountPrice).toFixed(2)}KM&nbsp;</h2>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: "0" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.005, duration: 1 }}
        className="add-to-cart-container"
      >
        <button
          onClick={handleQuantityDecrease}
          className="btn add-to-cart-decrease"
        >
          -
        </button>
        <input
          disabled
          className="text-center add-to-cart-input"
          value={count}
          name="quantity"
          id="quantity"
          type="text"
        />
        <button
          onClick={handleQuantityIncrease}
          className="btn add-to-cart-increase"
        >
          +
        </button>

        {duplicateProduct != null || duplicateProduct != undefined ? (
          <Popconfirm
            title={`Proizvod je vec u korpi. Da li ste sigurni da želite dodati jos ${count} komada`}
            onConfirm={() => handleAddToCart()}
            onCancel={cancel}
            okText={`DODAJ JOS ${count} KOMADA`}
            cancelText="Zatvori"
          >
            <button
              className="add-to-cart-submit btn"
              style={{ fontSize: "2em" }}
            >{`dodaj jos ${count} u korpu`}</button>
          </Popconfirm>
        ) : (
          <button onClick={handleAddToCart} className="add-to-cart-submit btn">
            dodaj u korpu
          </button>
        )}
        <br />
        <br />
      </motion.div>
    </>
  );
};

export default SingleProductCard;

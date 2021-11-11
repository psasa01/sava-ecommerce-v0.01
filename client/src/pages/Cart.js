import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import _ from "lodash";

import BackButton from "../components/nav/BackButton";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [korpa, setKorpa] = useState(cart.length > 0 ? cart : []);
  const dispatch = useDispatch();
  let proizvodi = "";
  if (cart.length === 1) {
    proizvodi = "proizvod";
  } else {
    proizvodi = "proizvoda";
  }

  let total = 0;

  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  const handlePlus = (value) => {
    //   // 1. Make a shallow copy of the items

    let items = korpa;
    let index = items.findIndex((p) => p._id == value);

    items[index].count = items[index].count + 1;

    setKorpa([...korpa], items);
    localStorage.setItem("cart", JSON.stringify(korpa));
  };

  const handleMinus = (value) => {
    let items = korpa;
    let index = items.findIndex((p) => p._id == value);

    if (korpa[index].count > 1) {
      items[index].count = items[index].count - 1;
    } else {
      items[index].count = items[index].count;
    }

    setKorpa([...korpa], items);
    localStorage.setItem("cart", JSON.stringify(korpa));
  };

  const handleRemove = (value) => {
    let items = korpa;
    let index = items.findIndex((p) => p._id == value);

    let filteredItems = _.reject(items, { _id: value });

    localStorage.setItem("cart", JSON.stringify(filteredItems));
    setKorpa(filteredItems);

    // add to redux state
    dispatch({
      type: "ADD_TO_CART",
      payload: filteredItems,
    });
  };

  return (
    <>
      <div className="korpa-container">
        <div className="korpa-left" id="style-4">
          <h2>Vaša korpa</h2>
          {korpa.length ? (
            korpa.map((c, i) => (
              <div key={i} className="proizvod-row">
                <div className="cart-left-image">
                  <img
                    src={`../../images/products/${slugify(
                      c.title.toLowerCase()
                    )}.jpg`}
                    alt=""
                  />
                </div>
                <div className="cart-left-product">
                  <p>
                    <span>
                      {c.width}/{c.height}R{c.rim}
                    </span>
                    <br />
                    {c.title}
                  </p>
                </div>
                <div className="cart-left-price-count">
                  <div className="cart-count">
                    <div
                      className="count-minus"
                      onClick={() => handleMinus(c._id)}
                    >
                      <p>-</p>
                    </div>
                    <div className="count-value">
                      <input
                        type="text"
                        value={c.count}
                        className="form-control"
                        id="count-value"
                      />
                    </div>
                    <div
                      className="count-plus"
                      onClick={() => handlePlus(c._id)}
                    >
                      <p>+</p>
                    </div>
                  </div>
                  <div className="cart-count-hr">
                    <hr />
                  </div>
                  <div className="cart-count-price">
                    <p>
                      {parseFloat(c.price).toFixed(2)}
                      &nbsp;KM
                    </p>
                  </div>
                </div>
                <div className="cart-left-price">
                  <p>
                    {parseFloat(
                      (c.price - (c.price * c.discount) / 100) * c.count
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="cart-left-remove">
                  <div className="icon-delete">
                    <Popconfirm
                      title="Da li ste sigurni da želite ukloniti proizvod iz korpe?"
                      onConfirm={() => handleRemove(c._id)}
                      onCancel={cancel}
                      okText="Obriši"
                      cancelText="Zatvori"
                    >
                      <DeleteOutlined className="icon" />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="ml-4">
              <br />
              Vaša korpa je trenutno prazna. <br /> Molimo Vas da pretražite
              prodavnicu i dodate željene artikle.
            </p>
          )}
        </div>
        <div className="korpa-right">
          <h2>Detaljan pregled narudžbe:</h2>
          <br />

          {korpa.length ? (
            <table
              className="table table-sm table-striped table-hover col-md-12"
              style={{
                width: "100%",
                maxWidth: "95%",
                margin: "auto",
              }}
            >
              <thead>
                <tr>
                  <td> </td>
                  <td>Naziv</td>
                  <td>Kolicina</td>
                  <td>Cijena</td>
                  <td>S popustom</td>
                  <td style={{ textAlign: "right" }}>Ukupno</td>
                </tr>
              </thead>
              <tbody>
                {korpa.map((c, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {c.width}/{c.height}R{c.rim} {c.title}
                    </td>
                    <td style={{ textAlign: "center" }}>{c.count}</td>
                    <td>{parseFloat(c.price).toFixed(2)} KM</td>
                    <td>
                      {parseFloat(
                        c.price - (c.price * c.discount) / 100
                      ).toFixed(2)}{" "}
                      KM
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <b>
                        {parseFloat(
                          (c.price - (c.price * c.discount) / 100) * c.count
                        ).toFixed(2)}{" "}
                        KM
                      </b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="ml-4">
              Vaša korpa je trenutno prazna. <br /> Molimo Vas da pretražite
              prodavnicu i dodate željene artikle.
            </p>
          )}
          <div
            className="total"
            style={{
              position: "absolute",
              bottom: "2.5em",
              right: "0",
              width: "100%",
            }}
          >
            {korpa.map((c, i) => {
              total = (
                parseFloat(total) +
                parseFloat((c.price - (c.price * c.discount) / 100) * c.count)
              ).toFixed(2);
            })}
            <h1
              style={{
                color: "#555",
                marginRight: ".5em",
                marginBottom: ".2em",
                textAlign: "right",
                fontSize: "1.8vw",
              }}
            >
              Ukupno za platiti: <b>{total} KM</b>
            </h1>
            <hr />
            <button
              type="button"
              style={{ fontWeight: "bold" }}
              className="btn btn-outline-primary mt-4 mr-4 float-right"
              className={
                total === 0
                  ? "disabled btn btn-outline-primary mt-4 mr-4 float-right"
                  : "btn btn-outline-primary mt-4 mr-4 float-right"
              }
              disabled={total === 0 ? true : false}
            >
              Potvrdite narudžbu
            </button>
          </div>
        </div>
      </div>
      <BackButton />
    </>
  );
};

export default Cart;

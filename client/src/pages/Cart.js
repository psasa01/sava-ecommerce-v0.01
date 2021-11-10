import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [korpa, setKorpa] = useState(cart);
  const dispatch = useDispatch();
  let proizvodi = "";
  if (cart.length === 1) {
    proizvodi = "proizvod";
  } else {
    proizvodi = "proizvoda";
  }

  let total = 0;

  const handlePlus = (value) => {
    //   // 1. Make a shallow copy of the items

    let items = korpa;
    let index = items.findIndex((p) => p._id == value);

    items[index].count = items[index].count + 1;

    setKorpa([...korpa], items);
    console.log(korpa[index].count);

    //   // 2. Make a shallow copy of the item you want to mutate
    // let item = korpa.filter({_id: ''})
    //   // 3. Replace the property you're intested in
    //   item.name = 'newName';
    //   // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    //   items[1] = item;
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
                    <div className="count-minus">
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
                    <DeleteOutlined className="icon" />
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

          {cart.length ? (
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
                {cart.map((c, i) => (
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
            {cart.map((c, i) => {
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
            >
              Potvrdite narudžbu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";

import { getAllProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import _ from "lodash";

const ProductFilter = () => {
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getAllProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const initialState = {
    width: "",
    height: "",
    rim: "",
    posebnaPonuda: [true]
  };

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [values, setValues] = useState(initialState);
  const [markas, setMarkas] = useState([]);
  const [seasons, setSeasons] = useState([]);

  //   const fp = _.filter(products, { brand: "Dunlop" });

  //   setFiltered(fp);
  //   const { brand, width, height, posebnaPonuda } = values;

  const { width, height, rim, posebnaPonuda } = values;

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleCheck = e => {
    if (e.target.checked) {
      setMarkas([...markas, e.target.value]);
    } else {
      setMarkas(markas.filter(br => br !== e.target.value));
    }
  };

  const handleSeasonsCheck = e => {
    if (e.target.checked) {
      setSeasons([...seasons, e.target.value]);
    } else {
      setSeasons(seasons.filter(br => br !== e.target.value));
    }
  };

  // const handleCheckboxSubmit = () => {
  //   const brandCheckboxes = document.querySelectorAll(
  //     'input[name="brand"]:checked'
  //   );
  //   let checkedBrands = [];
  //   brandCheckboxes.forEach(checkbox => {
  //     checkedBrands.push(checkbox.value);
  //   });

  //   setValues({
  //     ...values,
  //     brand: checkedBrands
  //   });
  // };

  const handleSubmit = e => {
    if (seasons.length) {
      if (markas.length) {
        const result = _.filter(products, function(item) {
          return (
            width.indexOf(item.width) >= 0 &&
            height.indexOf(item.height) >= 0 &&
            rim.indexOf(item.rim) >= 0 &&
            markas.indexOf(item.brand) >= 0 &&
            seasons.indexOf(item.subs[0].name) >= 0 &&
            posebnaPonuda.indexOf(item.posebnaPonuda) >= 0
          );
        });
        setFiltered(result);
      } else {
        const result = _.filter(products, function(item) {
          return (
            width.indexOf(item.width) >= 0 &&
            height.indexOf(item.height) >= 0 &&
            rim.indexOf(item.rim) >= 0 &&
            seasons.indexOf(item.subs[0].name) >= 0 &&
            posebnaPonuda.indexOf(item.posebnaPonuda) >= 0
          );
        });
        setFiltered(result);
      }
    } else {
      if (markas.length) {
        const result = _.filter(products, function(item) {
          return (
            width.indexOf(item.width) >= 0 &&
            height.indexOf(item.height) >= 0 &&
            rim.indexOf(item.rim) >= 0 &&
            markas.indexOf(item.brand) >= 0 &&
            posebnaPonuda.indexOf(item.posebnaPonuda) >= 0
          );
        });
        setFiltered(result);
      } else {
        const result = _.filter(products, function(item) {
          return (
            width.indexOf(item.width) >= 0 &&
            height.indexOf(item.height) >= 0 &&
            rim.indexOf(item.rim) >= 0 &&
            posebnaPonuda.indexOf(item.posebnaPonuda) >= 0
          );
        });
        setFiltered(result);
      }
    }

    // const filterBy = { brand: ["Sava", "Dunlop"], width: ["195", "205"] };
    // const result = products.filter((o) =>
    //   Object.keys(filterBy).every((k) => filterBy[k].some((f) => o[k] === f))
    // );

    // const fp = _.filter(products, {
    //   brand: "Dunlop",
    //   width: "205",
    // });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ top: "3em", left: "2em" }}>
            {" "}
            <h3>filter</h3>
            <form>
              <div className="row">
                <div className="form-group col-md-2">
                  <label>Sirina</label>
                  <input
                    type="text"
                    name="width"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Visina</label>
                  <input
                    type="text"
                    name="height"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>Velicina felge</label>
                  <input
                    type="text"
                    name="rim"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <label for="sava">
                  {" "}
                  <input
                    type="checkbox"
                    name="brand"
                    value="Sava"
                    id="sava"
                    onChange={handleCheck}
                  />
                  Sava
                </label>

                <label for="goodyear">
                  {" "}
                  <input
                    type="checkbox"
                    name="brand"
                    value="Good Year"
                    id="good-year"
                    onChange={handleCheck}
                  />
                  Good Year
                </label>

                <label for="dunlop">
                  {" "}
                  <input
                    type="checkbox"
                    name="brand"
                    value="Dunlop"
                    id="dunlop"
                    onChange={handleCheck}
                  />
                  Dunlop
                </label>

                <label for="vredestein">
                  {" "}
                  <input
                    type="checkbox"
                    name="brand"
                    value="Vredestein"
                    id="vredestein"
                    onChange={handleCheck}
                  />
                  Vredestein
                </label>
              </div>
              <hr />
              <div className="row">
                <label for="summer">
                  {" "}
                  <input
                    type="checkbox"
                    name="seasons"
                    value="Ljetna guma"
                    id="summer"
                    onChange={handleSeasonsCheck}
                  />
                  Ljetna Guma
                </label>
                <label for="winter">
                  {" "}
                  <input
                    type="checkbox"
                    name="seasons"
                    value="Zimska guma"
                    id="winter"
                    onChange={handleSeasonsCheck}
                  />
                  Zimska Guma
                </label>
                <label for="allseason">
                  {" "}
                  <input
                    type="checkbox"
                    name="seasons"
                    value="Cjelogodisnja guma"
                    id="allseason"
                    onChange={handleSeasonsCheck}
                  />
                  Ljetna Guma
                </label>

                {/* <button type="button" onClick={handleCheckboxSubmit}>
                      Submit
                    </button> */}
              </div>
            </form>
            <br />
            <button onClick={handleSubmit}>
              <h3>Pretrazi</h3>
            </button>
          </div>
          <div className="col" style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Svi Proizvodi</h4>
              {/* <div className="page-no">Stranica: {page}</div> */}
            </div>

            <div className="row max-w-100">
              {filtered.map(product => (
                <div key={product._id} className="col-lg-6 col-xl-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* {JSON.stringify(filtered)} */}
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;

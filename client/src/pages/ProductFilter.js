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
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const initialState = [
    {
      brand: ["Sava", "Dunlop", "Vredestein"],
      width: ["195", "205", "225", "215"],
      height: ["50"],
      posebnaPonuda: [true],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [values, setValues] = useState(initialState);

  //   const fp = _.filter(products, { brand: "Dunlop" });

  //   setFiltered(fp);
  //   const { brand, width, height, posebnaPonuda } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const result = _.filter(products, function (item) {
      return (
        values.brand.indexOf(item.brand) >= 0 &&
        values.width.indexOf(item.width) >= 0 &&
        values.height.indexOf(item.height) >= 0 &&
        values.posebnaPonuda.indexOf(item.posebnaPonuda) >= 0
      );
    });

    // const filterBy = { brand: ["Sava", "Dunlop"], width: ["195", "205"] };
    // const result = products.filter((o) =>
    //   Object.keys(filterBy).every((k) => filterBy[k].some((f) => o[k] === f))
    // );

    // const fp = _.filter(products, {
    //   brand: "Dunlop",
    //   width: "205",
    // });
    setFiltered(result);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ top: "3em" }}>
            {" "}
            <h3>filter</h3>
            <form>
              <div className="row">
                <div className="form-group col-md-2">
                  <label>Sirina</label>
                  <input
                    type="text"
                    name="sirina"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
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
              {filtered.map((product) => (
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

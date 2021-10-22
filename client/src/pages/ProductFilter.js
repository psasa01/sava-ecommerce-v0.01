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

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [brandchckd, setBrandchckd] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    subs: {
      name: [],
    },
    brand: [],
    category: {
      name: [],
    },
    width: "",
    height: "",
    rim: "",
  });

  // destructure filter
  const { width, height, rim, brand } = filters;
  const category = filters.category.name;
  const subs = filters.subs.name;

  //   const fp = _.filter(products, { brand: "Dunlop" });

  //   setFiltered(fp);
  //   const { brand, width, height, posebnaPonuda } = values;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleBrandCheck = (e) => {
    if (e.target.checked) {
      let brandArray = filters[e.target.name];
      brandArray.push(e.target.value);
      setFilters({ ...filters, [e.target.name]: brandArray });
    } else {
      let brandArray = filters[e.target.name];
      let newBrandArray = brandArray.filter((br) => br !== e.target.value);

      setFilters({ ...filters, [e.target.name]: newBrandArray });
    }
  };

  const handleSeasonsCheck = (e) => {
    if (e.target.checked) {
      let subsArray = filters[e.target.name].name;
      subsArray.push(e.target.value);
      setFilters({ ...filters, [e.target.name]: { name: subsArray } });
    } else {
      let newSubsArray = subs.filter((br) => br !== e.target.value);

      setFilters({ ...filters, [e.target.name]: { name: newSubsArray } });
    }
  };

  const handleCheckboxSubmit = () => {
    //
  };

  let buildFilter = (filters) => {
    let query = {};
    for (let keys in filters) {
      if (filters[keys].constructor === Array && filters[keys].length > 0) {
        query[keys] = filters[keys];
      }
    }
    return query;
  };

  const handleSubmit = (e) => {
    //
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
                    onChange={handleBrandCheck}
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
                    onChange={handleBrandCheck}
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
                    onChange={handleBrandCheck}
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
                    onChange={handleBrandCheck}
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
                    name="subs"
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
                    name="subs"
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
                    name="subs"
                    value="Cjelogodisnja guma"
                    id="allseason"
                    onChange={handleSeasonsCheck}
                  />
                  Cjelogodisnja guma
                </label>

                {/* <button type="button" onClick={handleCheckboxSubmit}>
                      Submit
                    </button> */}
              </div>

              <hr />

              {/* <div className="row">
                <label for="putnicka">
                  {" "}
                  <input
                    type="checkbox"
                    name="category"
                    value="Gume za putnicka vozila"
                    id="putnicka"
                    onChange={handleSeasonsCheck}
                  />
                  Gume za putnicka vozila
                </label>
                <label for="suv">
                  {" "}
                  <input
                    type="checkbox"
                    name="category"
                    value="Gume za SUV vozila"
                    id="suv"
                    onChange={handleSeasonsCheck}
                  />
                  Gume za SUV vozila
                </label>
                <label for="dostavna">
                  {" "}
                  <input
                    type="checkbox"
                    name="category"
                    value="Gume za dostavna vozila"
                    id="dostavna"
                    onChange={handleSeasonsCheck}
                  />
                  Gume za dostavna vozila
                </label> */}

              {/* <button type="button" onClick={handleCheckboxSubmit}>
                      Submit
                    </button> */}
              {/* </div> */}
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

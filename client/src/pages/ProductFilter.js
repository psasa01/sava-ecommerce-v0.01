import React, { useEffect, useState } from "react";

import { getAllProducts } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import _ from "lodash";

const initialSizeSearchState = [];

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

  const [sizePretrazeno, setSizePretrazeno] = useState(false);
  const [values, setValues] = useState(initialSizeSearchState);
  const [sizeFilteredProducts, setSizeFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredFilters, setFilteredFilters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    subs: {
      name: []
    },
    brand: [],
    category: {
      name: []
    },
    width: [],
    height: [],
    rim: []
  });

  // destructure filter
  const { width, height, rim, brand } = filters;
  const category = filters.category.name;
  const subs = filters.subs.name;

  //   const fp = _.filter(products, { brand: "Dunlop" });

  //   setFiltered(fp);
  //   const { brand, width, height, posebnaPonuda } = values;

  const handleChange = e => {
    let newArr = [];
    newArr.push(e.target.value);
    setFilters({
      ...filters,
      [e.target.name]: newArr
    });
  };

  const handleBrandCheck = e => {
    if (e.target.checked) {
      let brandArray = filters[e.target.name];
      brandArray.push(e.target.value);
      setFilters({ ...filters, [e.target.name]: brandArray });
    } else {
      let brandArray = filters[e.target.name];
      let newBrandArray = brandArray.filter(br => br !== e.target.value);

      setFilters({ ...filters, [e.target.name]: newBrandArray });
    }
  };

  const handleSeasonsCheck = e => {
    if (e.target.checked) {
      let subsArray = filters[e.target.name].name;
      subsArray.push(e.target.value);
      setFilters({ ...filters, [e.target.name]: { name: subsArray } });
    } else {
      let newSubsArray = subs.filter(br => br !== e.target.value);

      setFilters({ ...filters, [e.target.name]: { name: newSubsArray } });
    }
  };

  const handleCheckboxSubmit = () => {
    //
  };

  const buildFilter = filter => {
    let query = {};
    for (let keys in filter) {
      if (filter[keys].constructor === Array && filter[keys].length > 0) {
        query[keys] = filter[keys];
      }
    }
    setFilteredFilters(query);
  };

  const filterData = (data, query) => {
    const filteredData = data.filter(item => {
      for (let key in query) {
        if (item[key] === undefined || !query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    setFiltered(filteredData);
  };

  const handleSubmit = e => {
    buildFilter(filters);
    filterData(products, filteredFilters);
  };

  const w = products
    .map(p => p.width)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => {
      return a - b;
    });

  let h = [];
  let r = [];

  // const loadSizeFiltered = () => {
  //     setLoading(true);
  //     sizeSearch(width, height, rim).then((res) => {

  //     })
  // }

  const resetButton = document.getElementById("reset-button");
  const heightSelector = document.getElementById("select-height");
  const widthSelector = document.getElementById("select-width");
  const rimSelector = document.getElementById("select-rim");
  const sirinaOption = document.getElementById("sirina-option");
  // const sizeSearchButton = document.getElementById("size-search-button");

  const handleWidthChange = e => {
    // pretrazi products za odabranu sirinu
    const productsWithSelectedWidth = _.filter(products, {
      width: e.target.value
    });

    // enable Visina
    heightSelector.disabled = false;

    // diable sizeSearchButton
    // sizeSearchButton.disabled = true;

    // ako je selectovan 'sirina', ponovo disable height i rim
    if (e.target.value === "sirina" || e.target.value === null) {
      heightSelector.disabled = true;
      rimSelector.disabled = true;
      // sizeSearchButton.disabled = true;
    }

    // nadji sve visine koje pripadaju selectovanoj sirini

    h = productsWithSelectedWidth
      .map(p => p.height)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a - b;
      });

    // console.log("HHHHH", h);

    // izbrisi sve dosadasnje visine i felge

    heightSelector.options.length = null;
    rimSelector.options.length = null;

    // napravi 'visina' i 'felga' option
    var visinaOption = document.createElement("option");
    visinaOption.text = "Visina";
    visinaOption.value = "visina";
    heightSelector.add(visinaOption, null);

    var rimOption = document.createElement("option");
    rimOption.text = "Veličina felge";
    rimOption.value = "felga";
    rimSelector.add(rimOption, null);

    // za svaku visinu iz productsWithSelectedWidth napravi novi option
    h.map(hg => {
      var option = document.createElement("option");
      option.text = hg;
      option.value = hg;
      heightSelector.add(option, null);
    });

    // postavi vijednosti u state

    setValues({
      ...values,
      height: null,
      rim: null,

      [e.target.name]: e.target.value
    });
    setFilters({
      ...filters,
      height: null,
      rim: null,

      [e.target.name]: [e.target.value]
    });
  };

  const handleHeightChange = e => {
    // pretrazi products za odabranu sirinu

    const productsWithSelectedWidthAndHeight = _.filter(products, {
      width: values.width,
      height: e.target.value
    });

    // disable sizeSearchButton
    // sizeSearchButton.disabled = true;

    // enable Velicina Felge

    rimSelector.disabled = false;

    // ako je selectovan 'visina', ponovo disable
    if (e.target.value === "visina") {
      rimSelector.disabled = true;
    }

    // nadji sve felge koje pripadaju selectovanoj sirini i visini

    r = productsWithSelectedWidthAndHeight
      .map(p => p.rim)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a - b;
      });

    // console.log("HHHHH", h);

    // izbrisi sve dosadasnje visine

    rimSelector.options.length = null;

    // napravi 'rim' option
    var rimOption = document.createElement("option");
    rimOption.text = "Veličina felge";
    rimOption.value = "rim";
    rimSelector.add(rimOption, null);

    // za svaku visinu iz productsWithSelectedWidth napravi novi option
    r.map(rg => {
      var option = document.createElement("option");
      option.text = rg;
      option.value = rg;
      rimSelector.add(option, null);
    });

    // postavi vrijednosti u state

    setValues({
      ...values,

      [e.target.name]: e.target.value,
      rim: null
    });
    setFilters({
      ...filters,

      [e.target.name]: [e.target.value],
      rim: null
    });
  };

  const handleRimChange = e => {
    // const sizeSearchButton = document.getElementById("size-search-button");
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

    setFilters({
      ...filters,
      [e.target.name]: [e.target.value]
    });

    // !rim || rim === "rim"
    //   ? (sizeSearchButton.disabled = false)
    //   : (sizeSearchButton.disabled = true);
  };

  const resetSearch = e => {
    e.preventDefault();
    // window.location.reload(false);

    // izbrisi state
    setValues({
      width: null,
      height: null,
      rim: null
    });

    setFilters({
      ...filters,
      width: null,
      height: null,
      rim: null
    });

    // izbrisi sve dosadasnje visine i felge

    heightSelector.options.length = null;
    rimSelector.options.length = null;

    // napravi 'visina' i 'felga' option
    var visinaOption = document.createElement("option");
    visinaOption.text = "Visina";
    visinaOption.value = "visina";
    heightSelector.add(visinaOption, null);
    heightSelector.disabled = true;

    var rimOption = document.createElement("option");
    rimOption.text = "Veličina felge";
    rimOption.value = "felga";
    rimSelector.add(rimOption, null);
    rimSelector.disabled = true;
    // sizeSearchButton.disabled = true;

    // postavi sirinu na 'sirina'
    sirinaOption.selected = true;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6" style={{ top: "3em", left: "2em" }}>
            {" "}
            <h3>filter</h3>
            <form>
              <div className="form-row">
                <form
                  // onSubmit={handleSubmitSizeSearch}
                  className="form-inline size-search-form"
                >
                  <div className="form-container">
                    <select
                      name="width"
                      className="form-select"
                      id="select-width"
                      onChange={handleWidthChange}
                      placeholder="Sirina"
                    >
                      <option value="sirina" id="sirina-option">
                        Širina
                      </option>
                      {/* <option key="185" value="185">
                185
              </option> */}

                      {w.map(w => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>

                    <select
                      name="height"
                      className="form-select"
                      disabled
                      id="select-height"
                      onChange={handleHeightChange}
                    >
                      <option>Visina</option>
                    </select>

                    <select
                      name="rim"
                      className="form-select"
                      onChange={handleRimChange}
                      disabled
                      id="select-rim"
                      style={{
                        marginBottom: "1em"
                      }}
                    >
                      <option value="rim">Veličina felge</option>
                      {/* <option key="15" value="15">
                15
              </option> */}

                      {r.map(r => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>

                    {/* <button
                  disabled
                  style={{
                    height: "3em",
                    border: "1px solid #ccc",
                    background: "#5faeff",
                    paddingTop: ".6em",
                    color: "white",
                    margin: "0"
                  }}
                  className="btn btn-outline-info btn-disabled"
                  id="size-search-button"
                >
                  PRETRAŽIVANJE
                </button> */}
                    <button
                      type="button"
                      onClick={resetSearch}
                      style={{
                        height: "3em",
                        border: "1px solid #ccc",
                        background: "#ff3035",
                        paddingTop: ".6em",
                        color: "white",
                        margin: "0"
                      }}
                      className="btn btn-danger"
                      id="reset-button"
                    >
                      PONIŠTI PRETRAGU
                    </button>
                  </div>
                </form>
              </div>

              {/* <div className="row">
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
              </div> */}

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

              <div className="row">
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

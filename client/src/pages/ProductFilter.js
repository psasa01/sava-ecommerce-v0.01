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
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
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
      name: [],
    },
    brand: [],
    category: {
      name: [],
    },
    width: [],
    height: [],
    rim: [],
  });

  // destructure filter
  const { width, height, rim, brand } = filters;
  const category = filters.category.name;
  const subs = filters.subs.name;

  //   const fp = _.filter(products, { brand: "Dunlop" });

  //   setFiltered(fp);
  //   const { brand, width, height, posebnaPonuda } = values;

  const handleChange = (e) => {
    let newArr = [];
    newArr.push(e.target.value);
    setFilters({
      ...filters,
      [e.target.name]: newArr,
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

  const buildFilter = (filter) => {
    let query = {};
    for (let keys in filter) {
      if (filter[keys].constructor === Array && filter[keys].length > 0) {
        query[keys] = filter[keys];
      }
    }
    setFilteredFilters(query);
  };

  const filterData = (data, query) => {
    const filteredData = data.filter((item) => {
      for (let key in query) {
        if (item[key] === undefined || !query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    setFiltered(filteredData);
  };

  const handleSubmit = (e) => {
    buildFilter(filters);
    filterData(products, filteredFilters);
  };

  const w = products
    .map((p) => p.width)
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

  const handleWidthChange = (e) => {
    // pretrazi products za odabranu sirinu
    const productsWithSelectedWidth = _.filter(products, {
      width: e.target.value,
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
      .map((p) => p.height)
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
    h.map((hg) => {
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

      [e.target.name]: e.target.value,
    });
    setFilters({
      ...filters,
      height: null,
      rim: null,

      [e.target.name]: [e.target.value],
    });
  };

  const handleHeightChange = (e) => {
    // pretrazi products za odabranu sirinu

    const productsWithSelectedWidthAndHeight = _.filter(products, {
      width: values.width,
      height: e.target.value,
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
      .map((p) => p.rim)
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
    r.map((rg) => {
      var option = document.createElement("option");
      option.text = rg;
      option.value = rg;
      rimSelector.add(option, null);
    });

    // postavi vrijednosti u state

    setValues({
      ...values,

      [e.target.name]: e.target.value,
      rim: null,
    });
    setFilters({
      ...filters,

      [e.target.name]: [e.target.value],
      rim: null,
    });
  };

  const handleRimChange = (e) => {
    // const sizeSearchButton = document.getElementById("size-search-button");
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    setFilters({
      ...filters,
      [e.target.name]: [e.target.value],
    });

    // !rim || rim === "rim"
    //   ? (sizeSearchButton.disabled = false)
    //   : (sizeSearchButton.disabled = true);
  };

  const resetSearch = (e) => {
    e.preventDefault();
    // window.location.reload(false);

    // izbrisi state
    setValues({
      width: null,
      height: null,
      rim: null,
    });

    setFilters({
      ...filters,
      width: null,
      height: null,
      rim: null,
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
          <div
            className="col-md-3"
            style={{ top: "3em", left: "2em", marginRight: "2em" }}
          >
            {" "}
            <h3>filter</h3>
            <form>
              <div className="filter-size-search-row">
                <form
                  // onSubmit={handleSubmitSizeSearch}
                  className="form-inline"
                >
                  <div className="filter-size-search-form-container">
                    <select
                      name="width"
                      className="filter-form-select"
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

                      {w.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>

                    <select
                      name="height"
                      className="filter-form-select"
                      disabled
                      id="select-height"
                      onChange={handleHeightChange}
                    >
                      <option>Visina</option>
                    </select>

                    <select
                      name="rim"
                      className="filter-form-select"
                      onChange={handleRimChange}
                      disabled
                      id="select-rim"
                    >
                      <option value="rim">Veličina felge</option>
                      {/* <option key="15" value="15">
                15
              </option> */}

                      {r.map((r) => (
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
                  </div>
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="btn btn-raised btn-danger filter-size-reset-button"
                    id="reset-button"
                  >
                    PONIŠTI PRETRAGU
                  </button>
                </form>
              </div>

              <hr />
              <br />
              <h4 style={{ fontSize: "1.3em", color: "#444" }}>
                Odaberite brandove koji vas zanimaju
              </h4>

              <div className="filter-checkbox-row">
                <input
                  className="checkbox-sava"
                  type="checkbox"
                  name="brand"
                  value="Sava"
                  id="sava"
                  onChange={handleBrandCheck}
                />
                <label
                  for="sava"
                  className="filter-checkbox-label label-sava"
                  id="checkbox-sava"
                >
                  Sava
                </label>

                <input
                  className="checkbox-goodyear"
                  type="checkbox"
                  name="brand"
                  value="Good Year"
                  id="goodyear"
                  onChange={handleBrandCheck}
                />
                <label
                  for="goodyear"
                  className="filter-checkbox-label label-goodyear"
                >
                  Good Year
                </label>
              </div>

              <div className="filter-checkbox-row">
                <input
                  className="checkbox-dunlop"
                  type="checkbox"
                  name="brand"
                  value="Dunlop"
                  id="dunlop"
                  onChange={handleBrandCheck}
                />
                <label
                  for="dunlop"
                  className="filter-checkbox-label  label-dunlop"
                >
                  Dunlop
                </label>

                <input
                  className="checkbox-vredestein"
                  type="checkbox"
                  name="brand"
                  value="Vredestein"
                  id="vredestein"
                  onChange={handleBrandCheck}
                />
                <label
                  for="vredestein"
                  className="filter-checkbox-label label-vredestein"
                >
                  Vredestein
                </label>
              </div>

              <hr />
              <br />
              <h4 style={{ fontSize: "1.3em", color: "#444" }}>
                Odaberite vrstu guma po sezoni
              </h4>
              <div className="filter-checkbox-row-flexcolumn">
                <input
                  className="checkbox-summer"
                  type="checkbox"
                  name="subs"
                  value="Ljetna guma"
                  id="summer"
                  onChange={handleSeasonsCheck}
                />
                <label
                  for="summer"
                  className="filter-checkbox-label label-summer"
                >
                  Ljetna Guma
                </label>
                <input
                  className="checkbox-winter"
                  type="checkbox"
                  name="subs"
                  value="Zimska guma"
                  id="winter"
                  onChange={handleSeasonsCheck}
                />
                <label
                  for="winter"
                  className="filter-checkbox-label label-winter"
                >
                  Zimska Guma
                </label>{" "}
                <input
                  className="checkbox-allseason"
                  type="checkbox"
                  name="subs"
                  value="Cjelogodisnja guma"
                  id="allseason"
                  onChange={handleSeasonsCheck}
                />
                <label
                  for="allseason"
                  className="filter-checkbox-label label-allseason"
                >
                  Cjelogodisnja guma
                </label>
                {/* <button type="button" onClick={handleCheckboxSubmit}>
                      Submit
                    </button> */}
              </div>

              <hr />
              <br />
              <h4 style={{ fontSize: "1.2em", color: "#444" }}>
                Odaberite namjenu guma po vrsti vozila
              </h4>
              <div className="filter-checkbox-row-flexcolumn">
                <input
                  className="checkbox-putnicka"
                  type="checkbox"
                  name="category"
                  value="Gume za putnicka vozila"
                  id="putnicka"
                  onChange={handleSeasonsCheck}
                />
                <label
                  for="putnicka"
                  className="filter-checkbox-label label-putnicka"
                >
                  {" "}
                  Gume za putnicka vozila
                </label>

                <input
                  className="checkbox-suv"
                  type="checkbox"
                  name="category"
                  value="Gume za SUV vozila"
                  id="suv"
                  onChange={handleSeasonsCheck}
                />
                <label for="suv" className="filter-checkbox-label label-suv">
                  {" "}
                  Gume za SUV vozila
                </label>

                <input
                  className="checkbox-dostavna"
                  type="checkbox"
                  name="category"
                  value="Gume za dostavna vozila"
                  id="dostavna"
                  onChange={handleSeasonsCheck}
                />
                <label
                  for="dostavna"
                  className="filter-checkbox-label label-dostavna"
                >
                  {" "}
                  Gume za dostavna vozila
                </label>

                {/* <button type="button" onClick={handleCheckboxSubmit}>
                      Submit
                    </button> */}
              </div>
            </form>
            <button
              onClick={handleSubmit}
              className="filter-button btn btn-raised btn-success float-right"
            >
              <h4>Primjenite filtere</h4>
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

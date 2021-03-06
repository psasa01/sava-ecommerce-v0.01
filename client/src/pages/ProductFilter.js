import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllProducts, getProductsByBrand } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import BackButton from "./../components/nav/BackButton";
import _ from "lodash";
import Loader from "../components/loader/Loader";

const initialSizeSearchState = [];

const ProductFilter = () => {
  const location = useLocation();

  // const { from } = location.state;

  // const from = undefined;
  const [from, setFrom] = useState(
    location.state && location.state.from.length > 0
      ? location.state.from
      : "nista"
  );

  const [sizePretrazeno, setSizePretrazeno] = useState(false);
  const [values, setValues] = useState(initialSizeSearchState);
  const [sizeFilteredProducts, setSizeFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredFilters, setFilteredFilters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    subsFilter: [],
    brand: from ? [from] : [],
    categoryFilter: [],
    width: [],
    height: [],
    rim: [],
  });

  useEffect(() => {
    load();
  }, []);

  // useEffect(() => {
  //   load();
  // });

  // const load = () => {
  //   if (from) loadBrandProducts();
  // };

  const load = () => {
    from === "nista" ? loadAllProducts() : loadBrandProducts();
  };

  const loadBrandProducts = () => {
    setLoading(true);
    loadAllProducts();
    setFilteredFilters(
      from != undefined ? { brand: [from] } : { brand: ["nothing"] }
    );
    filterData(products, { brand: from });
    setLoading(false);
  };

  const loadAllProducts = () => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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

  const filterData = async (data, query) => {
    const filteredData = data.filter((item) => {
      for (let key in query) {
        if (item[key] === undefined || !query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    await setFiltered(filteredData);
  };

  const handleSubmit = (e) => {
    setFrom("nista");
    e.preventDefault();
    setLoading(true);
    buildFilter(filters);
    filterData(products, filteredFilters);
    setLoading(false);
  };

  // destructure filter
  // const { width, height, rim, brand } = filters;
  // const category = filters.category.name;
  // const subs = filters.subs.name;

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

  // const handleSeasonsCheck = (e) => {
  //   if (e.target.checked) {
  //     let subsArray = filters[e.target.name].name;
  //     subsArray.push(e.target.value);
  //     setFilters({ ...filters, [e.target.name]: { name: subsArray } });
  //   } else {
  //     let newSubsArray = subs.filter((br) => br !== e.target.value);

  //     setFilters({ ...filters, [e.target.name]: { name: newSubsArray } });
  //   }
  // };

  const handleCheckboxSubmit = () => {
    //
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
    rimOption.text = "Veli??ina felge";
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
    rimOption.text = "Veli??ina felge";
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
    rimOption.text = "Veli??ina felge";
    rimOption.value = "felga";
    rimSelector.add(rimOption, null);
    rimSelector.disabled = true;
    // sizeSearchButton.disabled = true;

    // postavi sirinu na 'sirina'
    sirinaOption.selected = true;
  };

  // console.log("lllooocacation", location);

  return (
    <>
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <Loader />
        ) : (
          <></>
        )}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-3"
            style={{
              width: "93%",
              top: "4em",
              left: "2em",
              paddingRight: "2em",
            }}
          >
            {/* <h1>{JSON.stringify(location.state.from)}</h1> */}

            <form>
              <h3 className="filter-checkbox-label-h3">
                Odaberite dimenziju gume
              </h3>
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
                        ??irina
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
                      <option value="rim">Veli??ina felge</option>
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
                  PRETRA??IVANJE
                </button> */}
                  </div>
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="btn btn-raised btn-danger filter-size-reset-button"
                    id="reset-button"
                  >
                    PONI??TI PRETRAGU
                  </button>
                </form>
              </div>

              <br />
              <h3 className="filter-checkbox-label-h3">Odaberite brandove</h3>

              <div className="filter-checkbox-row">
                <input
                  defaultChecked={from === "Sava" ? true : false}
                  className="checkbox-sava hidden-checkbox"
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
                  // checked={location.state.from === "Good Year" ? true : false}
                  className="checkbox-goodyear  hidden-checkbox"
                  defaultChecked={from === "Good Year" ? true : false}
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
                  defaultChecked={from === "Dunlop" ? true : false}
                  className="checkbox-dunlop  hidden-checkbox"
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
                  defaultChecked={from === "Vredestein" ? true : false}
                  className="checkbox-vredestein  hidden-checkbox"
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

              <br />
              <h3 className="filter-checkbox-label-h3">
                Odaberite vrstu guma po sezoni
              </h3>
              <div className="filter-checkbox-row-flexcolumn">
                <input
                  className="checkbox-summer  hidden-checkbox"
                  type="checkbox"
                  name="subsFilter"
                  value="Ljetna guma"
                  id="summer"
                  onChange={handleBrandCheck}
                />
                <label
                  for="summer"
                  className="filter-checkbox-label label-summer"
                >
                  Ljetna Guma
                </label>
                <input
                  className="checkbox-winter  hidden-checkbox"
                  type="checkbox"
                  name="subsFilter"
                  value="Zimska guma"
                  id="winter"
                  onChange={handleBrandCheck}
                />
                <label
                  for="winter"
                  className="filter-checkbox-label label-winter"
                >
                  Zimska Guma
                </label>{" "}
                <input
                  className="checkbox-allseason  hidden-checkbox"
                  type="checkbox"
                  name="subsFilter"
                  value="Cjelogodisnja guma"
                  id="allseason"
                  onChange={handleBrandCheck}
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

              <br />
              <h3 className="filter-checkbox-label-h3">
                Odaberite namjenu guma po vrsti vozila
              </h3>
              <div className="filter-checkbox-row-flexcolumn">
                <input
                  className="checkbox-putnicka  hidden-checkbox"
                  type="checkbox"
                  name="categoryFilter"
                  value="Gume za putnicka vozila"
                  id="putnicka"
                  onChange={handleBrandCheck}
                />
                <label
                  for="putnicka"
                  className="filter-checkbox-label label-putnicka"
                >
                  {" "}
                  Gume za putnicka vozila
                </label>

                <input
                  className="checkbox-suv  hidden-checkbox"
                  type="checkbox"
                  name="categoryFilter"
                  value="Gume za SUV vozila"
                  id="suv"
                  onChange={handleBrandCheck}
                />
                <label for="suv" className="filter-checkbox-label label-suv">
                  {" "}
                  Gume za SUV vozila
                </label>

                <input
                  className="checkbox-dostavna  hidden-checkbox"
                  type="checkbox"
                  name="categoryFilter"
                  value="Gume za dostavna vozila"
                  id="dostavna"
                  onChange={handleBrandCheck}
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
              <h3 style={{ marginTop: ".36em" }}>Primjenite filtere</h3>
            </button>
          </div>
          <div className="col" style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Svi Proizvodi</h4>
              {/* <div className="page-no">Stranica: {page}</div> */}
            </div>

            <div className="row max-w-100">
              {filtered.map((product) => (
                <div
                  key={product._id}
                  className="col-lg-6 col-xl-3"
                  style={{ marginLeft: "2em", width: "95%" }}
                >
                  <Link to={`/product/${product.slug}`}>
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
            </div>

            {/* {JSON.stringify(filtered)} */}
            <br />
          </div>
        </div>
      </div>
      <BackButton />
    </>
  );
};

export default ProductFilter;

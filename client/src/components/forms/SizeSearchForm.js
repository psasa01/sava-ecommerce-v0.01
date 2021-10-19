import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import _ from "lodash";
import ProductCard from "../cards/ProductCard";
import { getAllProducts } from "../../functions/product";

import Loader from "../loader/Loader";

const initialSizeSearchState = [];

const SizeSearch = () => {
  const [sizePretrazeno, setSizePretrazeno] = useState(false);
  const [values, setValues] = useState(initialSizeSearchState);
  const [products, setProducts] = useState([]);
  const [sizeFilteredProducts, setSizeFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(null);

  const { width, height, rim } = values;

  useEffect(() => {
    setSizePretrazeno(false);
    loadAll();
    // distinctWidths();
    // distinctHeights();
    // distinctRims();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    getAllProducts().then(res => {
      setProducts(res.data);

      setTimeout(setLoading(false), 4000);
    });
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
  const sizeSearchButton = document.getElementById("size-search-button");

  const handleSubmitSizeSearch = e => {
    e.preventDefault();

    setSizePretrazeno(true);
    // loadSizeFiltered();
    // console.log('size filtered', sizeFilteredProducts)
    setLoading(true);

    const filtered = _.filter(products, { width, height, rim });
    setSizeFilteredProducts(filtered);

    // console.log(filtered)

    setValues({
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
    sizeSearchButton.disabled = true;

    // postavi sirinu na 'sirina'
    sirinaOption.selected = true;

    setTimeout(setLoading(false), 1000);
  };

  const handleWidthChange = e => {
    // pretrazi products za odabranu sirinu
    const productsWithSelectedWidth = _.filter(products, {
      width: e.target.value
    });

    // enable Visina
    heightSelector.disabled = false;

    // diable sizeSearchButton
    sizeSearchButton.disabled = true;

    // ako je selectovan 'sirina', ponovo disable height i rim
    if (e.target.value === "sirina" || e.target.value === null) {
      heightSelector.disabled = true;
      rimSelector.disabled = true;
      sizeSearchButton.disabled = true;
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
  };

  const handleHeightChange = e => {
    // pretrazi products za odabranu sirinu

    const productsWithSelectedWidthAndHeight = _.filter(products, {
      width: values.width,
      height: e.target.value
    });

    // disable sizeSearchButton
    sizeSearchButton.disabled = true;

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
  };

  const handleRimChange = e => {
    const sizeSearchButton = document.getElementById("size-search-button");
    setValues({
      ...values,

      [e.target.name]: e.target.value
    });

    !rim || rim === "rim"
      ? (sizeSearchButton.disabled = false)
      : (sizeSearchButton.disabled = true);
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
    sizeSearchButton.disabled = true;

    // postavi sirinu na 'sirina'
    sirinaOption.selected = true;
  };

  return (
    <div>
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <Loader />
        ) : (
          <></>
        )}
      </div>
      <div className="size-search">
        <div
          className={`size-search-row ${
            sizeFilteredProducts.length
              ? "size-search-row-open"
              : "size-search-row-close"
          }`}
        >
          {/* <div className={`banner ${active ? "active" : ""}`}></div> */}

          <div className="disclaimer-row">
            <p className="disclaimer">
              Poštovani posjetioci, da bi pronašli gume koje nudimo u Vašoj
              dimenziji potrebno je da redom izaberete širinu, visinu i veličinu
              felge, te nakon što odaberete sva polja pritisnete dugme
              "PRETRAŽIVANJE". Ukoliko nema rezultata za Vašu dimenziju, molimo
              Vas da nas kontaktirate na bilo koji od načina da provjerimo da li
              imamo tražene gume na skladištu, a da nisu ponuđene u web shopu
            </p>
          </div>

          <div className="form-row">
            <form
              onSubmit={handleSubmitSizeSearch}
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

                <button
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
                </button>
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
          <div
            className="row size-search-results"
            animate={{ height: "100%" }}
            transition={{ delay: 0.004441, duration: 3 }}
          >
            {sizeFilteredProducts.length && sizePretrazeno ? (
              sizeFilteredProducts.map(product => (
                <div key={product._id} className="col-lg-4 col-xl-3">
                  <Link to={`/product/${product.slug}`}>
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-lg-3 col-xl-4"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeSearch;

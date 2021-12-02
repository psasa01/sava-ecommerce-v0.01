import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  handleSubChange,
  handleCheckboxChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    brand,
    price,
    discount,
    categories,
    category,
    subs,
    quantity,
    images,
    width,
    height,
    rim,
    speedindex,
    loadindex,
    dot,
    producedin,
    fuel,
    wetGrip,
    noise,
    posebnaPonuda,
    sifra,
  } = values;

  return (
    <div className="create-product-form-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-2">
            <label>Šifra artikla</label>
            <input
              type="text"
              name="sifra"
              className="form-control input-no-bg"
              value={sifra}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-5">
            <label>Model gume</label>
            <input
              type="text"
              name="title"
              className="form-control input-no-bg"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-5">
            <label>Proizvođač</label>
            <input
              type="text"
              name="brand"
              className="form-control input-no-bg"
              value={brand}
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-group col-md-5">
            <label>Opis</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={handleChange}
            />
          </div> */}
        </div>

        <div className="row">
          <div className="form-group col-md-2">
            <label>Širina</label>
            <input
              type="text"
              name="width"
              className="form-control input-no-bg"
              value={width}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Visina</label>
            <input
              type="text"
              name="height"
              className="form-control input-no-bg"
              value={height}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Veličina felge</label>
            <input
              type="text"
              name="rim"
              className="form-control input-no-bg"
              value={rim}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Index Nosivosti</label>
            <input
              type="text"
              name="loadindex"
              className="form-control input-no-bg"
              value={loadindex}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Index Brzine</label>
            <input
              type="text"
              name="speedindex"
              className="form-control input-no-bg"
              value={speedindex}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>DOT</label>
            <input
              type="text"
              name="dot"
              className="form-control input-no-bg"
              value={dot}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-2">
            <label>Potrošnja Goriva</label>
            <input
              type="text"
              name="fuel"
              className="form-control input-no-bg"
              value={fuel}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Prijanjanje na mokrom</label>
            <input
              type="text"
              name="wetGrip"
              className="form-control input-no-bg"
              value={wetGrip}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Razina Buke</label>
            <input
              type="text"
              name="noise"
              className="form-control input-no-bg"
              value={noise}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Cijena</label>
            <input
              type="text"
              name="price"
              className="form-control input-no-bg"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Popust</label>
            <input
              type="text"
              name="discount"
              className="form-control input-no-bg"
              value={discount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Količina na stanju</label>
            <input
              type="text"
              name="quantity"
              className="form-control input-no-bg"
              value={quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="form-group col-md-4">
            <label>Zemlja porijekla</label>
            <input
              type="text"
              name="producedin"
              className="form-control input-no-bg"
              value={producedin}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Kategorija</label>

            <select
              name="category"
              className="form-control input-no-bg"
              onChange={handleCategoryChange}
            >
              <option>Odaberite osnovnu kategoriju</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {showSub && (
            <div className="form-group col-md-4">
              <label htmlFor="subs">Podkategorije</label>
              <select
                name="subs"
                className="form-control input-no-bg"
                mode="single"
                style={{ width: "100%" }}
                value={subs}
                onChange={handleSubChange}
                // onChange={(value) => setValues({ ...values, subs: value })}
              >
                <option value="">Odaberite podkategoriju</option>
                {subOptions.length &&
                  subOptions.map((s) => (
                    <option value={s._id} key={s._id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <br />
        <div className="row">
          <div className="form-group col-md-2">
            <input
              className="checkbox-dunlop  hidden-checkbox"
              type="checkbox"
              name="posebnaPonuda"
              value={posebnaPonuda}
              id="posebnaPonuda"
              onChange={handleCheckboxChange}
              style={{
                width: "100%",
                height: "5em !Important",
              }}
            />
            <label
              for="posebnaPonuda"
              className="filter-checkbox-label label-dunlop posebna-ponuda-label"
              // style={{
              //   width: "100%",
              //   height: "5em !Important",
              // }}
            >
              Posebna Ponuda
            </label>{" "}
            {/* <label>Posebna ponuda</label>

            <input
              type="checkbox"
              name="posebnaPonuda"
              className="form-input posebna-ponuda-checkbox"
              value={posebnaPonuda}
              onChange={handleCheckboxChange}
            ></input> */}
          </div>
          <div className="form-group col-md-2 offset-8">
            <button className="btn spremi-proizvod-button">
              Spremi proizvod
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCreateForm;

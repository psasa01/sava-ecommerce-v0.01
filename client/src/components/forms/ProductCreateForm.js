import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
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
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-2">
          <label>Šifra artikla</label>
          <input
            type="text"
            name="sifra"
            className="form-control"
            value={sifra}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Model gume</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Opis</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-4">
          <label>Proizvođač</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Cijena</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Popust</label>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={discount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Količina na stanju</label>
          <input
            type="text"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-2">
          <label>Širina</label>
          <input
            type="text"
            name="width"
            className="form-control"
            value={width}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Visina</label>
          <input
            type="text"
            name="height"
            className="form-control"
            value={height}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Veličina felge</label>
          <input
            type="text"
            name="rim"
            className="form-control"
            value={rim}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Index Nosivosti</label>
          <input
            type="text"
            name="loadindex"
            className="form-control"
            value={loadindex}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Index Brzine</label>
          <input
            type="text"
            name="speedindex"
            className="form-control"
            value={speedindex}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3">
          <label>Potrošnja Goriva</label>
          <input
            type="text"
            name="fuel"
            className="form-control"
            value={fuel}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-3">
          <label>Prijanjanje na mokrom</label>
          <input
            type="text"
            name="wetGrip"
            className="form-control"
            value={wetGrip}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Razina Buke</label>
          <input
            type="text"
            name="noise"
            className="form-control"
            value={noise}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-2">
          <label>DOT</label>
          <input
            type="text"
            name="dot"
            className="form-control"
            value={dot}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Zemlja porijekla</label>
          <input
            type="text"
            name="producedin"
            className="form-control"
            value={producedin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Kategorija</label>

          <select
            name="category"
            className="form-control"
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
      </div>

      {showSub && (
        <div className="row">
          <div className="form-group col-md-1">
            <label>Posebna ponuda</label>

            <input
              type="checkbox"
              name="posebnaPonuda"
              className="form-input posebna-ponuda-checkbox"
              value={posebnaPonuda}
              onChange={handleCheckboxChange}
            ></input>
          </div>
          <div className="form-group col-md-4 offset-md-5">
            <label htmlFor="">Podkategorije</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Odaberite podkategorije"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option value={s._id} key={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      )}
      <br />
      <button className="btn btn-outline-info">Spremi proizvod</button>
    </form>
  );
};

export default ProductCreateForm;

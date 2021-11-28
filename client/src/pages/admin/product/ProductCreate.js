import React, { useState, useEffect } from "react";

import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getCategories, getCategorySubs } from "../../../functions/category";

import FileUpload from "../../../components/forms/FileUpload";
import { formatCountdown } from "antd/lib/statistic/utils";

// import gif from './../../../../public/images'

const initialState = {
  loading: false,
  title: "",
  brand: "",
  description: "",
  price: "",
  discount: "",
  categories: [],
  category: "",
  subs: [],
  quantity: "",
  images: [],
  shipping: "",
  width: "",
  height: "",
  rim: "",
  speedindex: "",
  loadindex: "",
  dot: "",
  producedin: "",
  posebnaPonuda: false,
  fullTitle: "",
  sifra: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        // console.log("RRREEESSS --------->", res);

        const { width, height, rim, loadindex, speedindex, title } = res.data;
        window.alert(
          `Uspjesno ste kreirali proizvod: ${width}/${height}R${rim} ${loadindex}${speedindex} - ${title}`
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400)
          toast.error("Doslo je do greske pri kreiranju novog artikla!");
        // toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setValues({
      ...values,
      posebnaPonuda: !values.posebnaPonuda,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY:", e.target.value);
    setValues({
      ...values,
      // subs: [],
      category: e.target.value,
    });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      setShowSub(true);
    });
  };

  const handleSubChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY:", e.target.value);
    setValues({
      ...values,
      // subs: [],
      subs: e.target.value,
    });
    // getCategorySubs(e.target.value).then((res) => {
    //   setSubOptions(res.data);
    //   setShowSub(true);
    // });
  };

  return (
    <>
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <div
            className={
              loading ? "loading-image fadeIn" : "loading-image fadeOut"
            }
          >
            <img
              src="https://res.cloudinary.com/sale01/image/upload/v1623307453/assets/loading.gif"
              className="loading-centered"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2" style={{ top: "3em" }}>
            <AdminNav />
          </div>
          <div className="col-md-10" style={{ top: "3em" }}>
            <div className="product-create-form-container">
              <p
                className="create-product-title-padding reg-form-title-text "
                style={{ paddingBottom: "0em" }}
              >
                Kreiranje Novog Proizvoda
              </p>
              <hr style={{ paddingTop: "0.5em" }} />
              {/* {JSON.stringify(values.images)} */}
              <div className="col">
                <FileUpload
                  // style={{ mixBlendMode: "multiply" }}
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>
              {/* <hr className="col-md-12 " /> */}
              <br />
              <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                setValues={setValues}
                values={values}
                handleCategoryChange={handleCategoryChange}
                subOptions={subOptions}
                showSub={showSub}
                handleSubChange={handleSubChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;

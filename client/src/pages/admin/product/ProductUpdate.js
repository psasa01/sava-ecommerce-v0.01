import React, { useState, useEffect } from "react";

import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";

import { Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getCategories, getCategorySubs } from "../../../functions/category";

import FileUpload from "../../../components/forms/FileUpload";
import { formatCountdown } from "antd/lib/statistic/utils";

import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

// import gif from './../../../../public/images'

const initialState = {
  loading: false,
  title: "",
  brand: "",
  description: "",
  price: "",
  discount: "",
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
  fullTitle: "",
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // load single product
      setValues({ ...values, ...p.data });
      // load single product subcategories
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load show default subs
      });
      // prepare array of subIds to show as default sub values in ant design Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubIds((prev) => arr); //required for antDesign select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Uspjesno ste uredili proizvod: "${res.data.title}"`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY:", e.target.value);
    setValues({
      ...values,
      subs: [],
      // category: e.target.value,
    });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      setShowSub(true);
    });

    // if user clicks on original category, subactegories goes to default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear all subcategries
    setArrayOfSubIds([]);
  };

  const handleCheckboxChange = (e) => {
    setValues({
      ...values,
      posebnaPonuda: !values.posebnaPonuda,
    });
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
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10 ">
            <h4 className="naslov">Uređivanje proizvoda</h4>
            {/* {JSON.stringify(values)} */}

            <div className="col" style={{ mixBlendMode: "multiply" }}>
              <FileUpload
                style={{ mixBlendMode: "multiply" }}
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>

            <hr className="col-md-10 " />
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              setValues={setValues}
              values={values}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubIds={arrayOfSubIds}
              setArrayOfSubIds={setArrayOfSubIds}
              selectedCategory={selectedCategory}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;

{
  /* {JSON.stringify(values.images)} */
}

{
}

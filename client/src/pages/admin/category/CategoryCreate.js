import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // STEP 1
  // Searching - filtering

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(
          `Uspjesno ste kreirali novu kategoriju: "${res.data.name}"`
        );
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (name.length > 32)
          toast.error("Naziv kategorije ne moze biti duzi od 32 karaktera ");
        if (err.response.status === 400 && name.length < 32)
          toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm(
    //   "Da li ste sigurni da zelite obrisati kategoriju?"
    // );
    // console.log(answer, slug);
    if (window.confirm("Da li ste sigurni da zelite obrisati kategoriju?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(
            `Uspjesno ste izbrisali kategoriju: "${res.data.name}"`
          );
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error("Doslo je do greske, kategorija nije izbrisana!");
          }
        });
    }
  };

  //   const categoryForm = () => (
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <input
  //           type="text"
  //           className="form-control"
  //           onChange={(e) => setName(e.target.value)}
  //           value={name}
  //           autoFocus
  //           required
  //         />
  //         <br />
  //         <button className="btn btn-outline-primary">Spremi Kategoriju</button>
  //       </div>
  //     </form>
  //   );

  // STEP 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
          <div className="col-md-2" style={{ top: "3em" }}>
            <AdminNav />
          </div>
          <div className="col-md-10 " style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Kreiranje Kategorije</h4>
            </div>

            <div className="col-md-10">
              {/* {categoryForm()} */}

              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
              <hr />

              {/* step 2 */}
              {/* importing local search component */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              {/* STEP 5 */}
              {/* Using HOF 'searched' in between functions */}

              {categories.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span
                    onClick={() => handleRemove(c.slug)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/category/${c.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-success" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  // STEP 1
  // Searching - filtering

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(
          `Uspjesno ste kreirali novu podkategoriju: "${res.data.name}"`
        );
        loadSubs();
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
    if (window.confirm("Da li ste sigurni da zelite obrisati podkategoriju?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(
            `Uspjesno ste izbrisali podkategoriju: "${res.data.name}"`
          );
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error("Doslo je do greske, podkategorija nije izbrisana!");
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

  const selectedCategory = categories.filter((c) => c._id === category);
  const subsFromSelectedCategory = subs
    .filter((s) => s.parent === category)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

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
          <div className="col-md-10" style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Kreiranje Podkategorije</h4>
            </div>
            {/* 
          {selectedCategory.map((s) => (
            <div>{s.name}</div>
          ))}
          {JSON.stringify(subsFromSelectedCategory)} */}
            <div className="row ">
              <div className="col-md-10 max-w-100">
                <div>
                  {/* <label>Kategorija</label> */}

                  <select
                    name="category"
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>
                      Odaberite kategoriju kojoj ce nova podkategorija pripasti
                    </option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
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
                {selectedCategory.map((x) => (
                  <div className="alert alert-primary">
                    <h4>{x.name}</h4>
                    <hr />

                    {!subsFromSelectedCategory.length ? (
                      <div className="alert alert-light">
                        {" "}
                        Odabrana kategorija jos uvijek nema podkategorije{" "}
                      </div>
                    ) : (
                      subsFromSelectedCategory
                        .filter(searched(keyword))

                        .map((s) => (
                          <div className="alert alert-light" key={s._id}>
                            {s.name}
                            <span
                              onClick={() => handleRemove(s.slug)}
                              className="btn btn-sm float-right"
                            >
                              <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                              <span className="btn btn-sm float-right">
                                <EditOutlined className="text-success" />
                              </span>
                            </Link>
                          </div>
                        ))
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* {categoryForm()} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCreate;

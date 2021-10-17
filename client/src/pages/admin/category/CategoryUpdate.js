import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";

import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Uspjesno ste uredili kategoriju: "${res.data.name}"`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400 && name.length > 32)
          toast.error("Naziv kategorije ne moze biti duzi od 32 karaktera ");
        if (err.response.status === 400 && name.length < 32)
          toast.error(err.response.data);
      });
  };

  // const categoryForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Naziv Kategorije</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         onChange={(e) => setName(e.target.value)}
  //         value={name}
  //         autoFocus
  //         required
  //       />
  //       <br />
  //       <button className="btn btn-outline-primary">SPREMI IZMJENE</button>
  //     </div>
  //   </form>
  // );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ top: "3em" }}>
          <AdminNav />
        </div>
        <div className="col-md-6" style={{ top: "3em" }}>
          {loading ? (
            <h4 className="text-danger">Ucitavanje...</h4>
          ) : (
            <h4>Uređivanje kategorije</h4>
          )}
          {/* {categoryForm()} */}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

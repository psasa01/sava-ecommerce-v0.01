import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../functions/sub";

import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSub();
  }, []);

  const loadSub = () =>
    getSub(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Uspjesno ste uredili podkategoriju: "${res.data.name}"`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400 && name.length > 32)
          toast.error("Naziv podkategorije ne moze biti duzi od 32 karaktera ");
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
              <h4>Uređivanje Kategorije</h4>
            </div>
            {/* {categoryForm()} */}
            <div className="row ">
              <div className="col-md-10 max-w-100">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUpdate;

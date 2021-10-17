import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import Loader from "../../components/loader/Loader";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

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
          <div className="col " style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Upravljačka ploča</h4>
            </div>
            <div className="row ">
              <div className="col-md-12 max-w-100"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";

import AdminNav from "../../../components/nav/AdminNav";
import {
  removeProduct,
  getProductsCount,
  getProductsForPagination,
} from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Pagination } from "antd";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsForPagination("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    return function cleanup() {
      setPage(1);
    };
  }, []);

  const handleRemove = (slug) => {
    removeProduct(slug, user.token)
      .then((res) => {
        loadAllProducts();
        toast.error(
          `Uspješno ste obrisali proizvod - ${res.data.width}/${res.data.height}R${res.data.rim} ${res.data.title} ${res.data.loadindex}${res.data.speedindex}`
        );
      })
      .catch((err) => {
        // if (err.response.status === 400)
        toast.error("Doslo je do greske pri brisanju artikla!");
      });

    // message.error("Uspješno ste obrisali artikl");
  };

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
          <div className="col" style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Svi Proizvodi</h4>
              <div className="page-no">Stranica: {page}</div>
            </div>

            <div className="row max-w-100">
              {products.map((product) => (
                <div key={product._id} className="col-lg-6 col-xl-3">
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
            <br />
            <div className="row">
              <Pagination
                current={page}
                total={(productsCount / 8) * 10}
                onChange={(value) => setPage(value)}
              />
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;

import React, { useEffect, useState } from "react";

import { forwardRef } from "react";

import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

import AdminNav from "../../../components/nav/AdminNav";
import {
  removeProduct,
  createProduct,
  updateProduct,
  getAllProducts
} from "../../../functions/product";

import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Pagination } from "antd";

const ProductTable = () => {
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getAllProducts()
      .then(res => {
        setProducts(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  let columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "slug", field: "slug", hidden: true, editable: true },
    {
      title: "Šifra Artikla",
      field: "sifra",
      disabled: true
    },
    {
      title: "Puni Naziv",
      field: "fullTitle",
      disabled: true,
      editable: "none"
    },
    { title: "Popust", field: "discount" },
    { title: "Cijena", field: "price" },
    { title: "Količina", field: "quantity" },
    { title: "DOT", field: "dot" },
    {
      title: "Izdvojeno",
      field: "posebnaPonuda",
      disabled: true,
      editComponent: props => {
        console.log("proooopppssss", props);

        return (
          <input
            type="checkbox"
            checked={props.value}
            onChange={e => props.onChange(e.target.checked)}
          />
        );
      },
      render: rowdata => (
        <input type="checkbox" checked={rowdata.posebnaPonuda} />
      )
    }
  ];

  let editable = { sifra: "onAdd" };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  function validateEmail(email) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const { user } = useSelector(state => ({ ...state }));

  const api = axios.create({
    baseURL: `http://localhost:8000/api/`
  });

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    // if (newData.first_name === undefined) {
    //   errorList.push("Please enter first name");
    // }
    // if (newData.last_name === undefined) {
    //   errorList.push("Please enter last name");
    // }
    // if (newData.email === undefined || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email");
    // }
    if (errorList.length < 1) {
      //no error
      createProduct(newData, user.token)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];

    if (errorList.length < 1) {
      updateProduct(oldData.slug, newData, user.token)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData);
    removeProduct(oldData.slug, user.token)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData._id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <>
      {/* {JSON.stringify(products)} */}
      <div className="loading-container" onclick="return false;">
        {loading ? (
          // <LoadingOutlined style={{ color: "red" }} />
          <Loader />
        ) : (
          <></>
        )}
      </div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-2" style={{ top: "3em" }}>
            <AdminNav />
          </div>
          <div className="col" style={{ top: "3em" }}>
            <div className="title-page">
              <h4>Svi Proizvodi - tabela</h4>
            </div>

            <div className="row" style={{ display: "block" }}>
              <MaterialTable
                style={{
                  width: "95%",
                  maxWidth: "80vw"
                }}
                title="Pregled i uredjivanje proizvoda"
                columns={columns}
                data={data}
                icons={tableIcons}
                options={{ maxBodyHeight: "70vh", pageSize: 20 }}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      handleRowUpdate(newData, oldData, resolve);
                    }),
                  onRowAdd: undefined,
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      handleRowDelete(oldData, resolve);
                    })
                }}
              />
            </div>
            <br />
            {/* <div className="row">
              <Pagination
                current={page}
                total={(productsCount / 8) * 10}
                onChange={(value) => setPage(value)}
              />
            </div> */}
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;

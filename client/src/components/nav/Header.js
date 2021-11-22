import React, { useState, useEffect } from "react";
import { Modal, Menu, Badge, Button } from "antd";

import { auth, googleAuthProvider } from "./../../firebase";
import { toast } from "react-toastify";

import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import { createOrUpdateUser } from "../../functions/auth";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = ({ history }) => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // let history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
            toast.success("uspjesno ste se prijavili", {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: "foo-bar",
            });
            handleCancel();
          })
          .catch();

        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  // const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/signin");
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        className="modal-radius"
        transitionName=""
        maskStyle={{
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(.5em) brightness(60%)",
        }}
        title="Prijava"
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        // [
        // <Button key="back" onClick={handleCancel}>
        //   Return
        // </Button>,
        // <Button
        //   key="submit"
        //   type="primary"
        //   loading={loading}
        //   onClick={handleOk}
        // >
        //   Submit
        // </Button>,
        // <Button
        //   key="link"
        //   href="https://google.com"
        //   type="primary"
        //   loading={loading}
        //   onClick={handleOk}
        // >
        //   Search on Google
        // </Button>,

        // }
      >
        <div className="login-form-container">
          <div className="email-password-login-form">
            <label htmlFor="" className="auth-input-label">
              Email
            </label>
            <input
              type="email"
              className="form-control input-no-bg"
              id="email"
              style={{ width: "90%" }}
            />
            <label htmlFor="password" className="auth-input-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input-no-bg"
              id="password"
              style={{ width: "90%" }}
            />
          </div>

          <Link onClick={handleCancel} to="/forgot/password">
            <p className="auth-p">Zaboravili ste šifru?</p>
          </Link>
          <button
            // disabled={}
            type="submit"
            className="btn btn-raised login-form-button"
          >
            Prijava
          </button>

          <p className="auth-p2">
            Niste registrovani?&nbsp;
            <Link onClick={handleCancel} to="/signup">
              Registrujte se!
            </Link>
          </p>
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Google Prijava
          </Button>
        </div>
      </Modal>
      <div className="horizontal-nav ">
        <Menu
          className=""
          style={{
            background: "#9dd3ff6e",
            backdropFilter: "blur(0.3em) brightness(140%)",

            // borderBottom: "none",
          }}
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <NavLink exact to="/" activeClassName="nav-link-active">
              <img
                className="sava-logo"
                src="https://res.cloudinary.com/sale01/image/upload/v1623669939/assets/shopsavaba-logo-white-shadow.png"
                alt=""
              />
            </NavLink>
          </Menu.Item>
          {!user && (
            <Menu.Item key="register" className="float-right n-link">
              <NavLink
                to="/signup"
                activeClassName="nav-link-active"
                className="n-link"
              >
                <UserAddOutlined /> Registracija
              </NavLink>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item key="login" className="float-right">
              <NavLink
                to="#"
                onClick={showModal}
                activeClassName="nav-login-active"
                className="n-link"
              >
                <UserOutlined />
                Prijava
              </NavLink>
            </Menu.Item>
          )}

          {user && (
            <SubMenu
              key="SubMenu"
              icon={<SettingOutlined />}
              title={
                user.displayName ||
                user.name ||
                (user.email && user.email.split("@")[0])
              }
              className="float-right"
            >
              {user && user.role === "subscriber" && (
                <Item>
                  <Link to="/user/history">Upravljačka ploča</Link>
                </Item>
              )}
              {user && user.role === "admin" && (
                <Item>
                  <Link to="/admin/dashboard">Admin Upravljačka ploča</Link>
                </Item>
              )}

              <Item icon={<LogoutOutlined />} onClick={logout}>
                Odjava
              </Item>
            </SubMenu>
          )}
          <Menu.Item className="float-right">
            <NavLink
              to="/cart"
              activeClassName="nav-link-active"
              className="n-link"
            >
              <ShoppingCartOutlined />
              Korpa
              <Badge count={cart.length} offset={[6, -9]}></Badge>
            </NavLink>
          </Menu.Item>
          <Menu.Item className="float-right">
            <NavLink
              to="/products/filter"
              activeClassName="nav-link-active"
              className="n-link"
            >
              <ShopOutlined />
              Prodavnica
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Header;

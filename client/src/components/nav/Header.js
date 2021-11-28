import React, { useState, useEffect, useRef } from "react";
import { Modal, Menu, Badge, Button } from "antd";

import { auth, googleAuthProvider } from "./../../firebase";
import { toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";

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

import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = ({}) => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const [dropdown, setDropdown] = useState(false);

  let history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const ref = useRef();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
      setLoading(false);
    }
    setLoading(false);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleDropdownClose = () => {
    setDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
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
          toast.success("uspjesno ste se prijavili");
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;

        const idTokenResult = await user.getIdTokenResult();
        console.log("toookeeeeen", idTokenResult);
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
          })
          .catch();

        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    setVisible(false);
  };
  // const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    handleDropdownClose();
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
      >
        <div className="login-form-container">
          <div className="email-password-login-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="" className="auth-input-label">
                Email
              </label>
              <input
                type="email"
                className="form-control input-no-bg"
                id="email"
                style={{ width: "90%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
              />
              <label htmlFor="password" className="auth-input-label">
                Password
              </label>
              <input
                type="password"
                className="form-control input-no-bg"
                id="password"
                style={{ width: "90%" }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Šifra"
              />
            </form>
          </div>

          <Link onClick={handleCancel} to="/forgot/password">
            <p className="auth-p">Zaboravili ste šifru?</p>
          </Link>
          <button
            // disabled={}
            type="submit"
            className="btn btn-raised login-form-button"
            disabled={!email || password.length < 6}
            onClick={handleSubmit}
          >
            Prijava
          </button>

          <p className="auth-p2">
            Niste registrovani?&nbsp;
            <Link onClick={handleCancel} to="/signup">
              Registrujte se!
            </Link>
          </p>

          <button
            style={{ backgroundColor: "#cf4332" }}
            onClick={googleLogin}
            className="btn btn-raised google-login-form-button"
          >
            <GoogleOutlined /> Google Prijava
          </button>
        </div>
      </Modal>

      <div className="new-horizontal-nav" ref={ref}>
        <ul className="new-nav-ul">
          <div className="new-nav-left">
            <li>
              {" "}
              <NavLink exact to="/" activeClassName="nav-link-active">
                <img
                  className="sava-logo"
                  src="https://res.cloudinary.com/sale01/image/upload/v1623669939/assets/shopsavaba-logo-white-shadow.png"
                  alt=""
                />
              </NavLink>
            </li>
          </div>
          <div className="new-nav-right">
            <li className="new-nav-ul-item">
              <NavLink
                to="/products/filter"
                // style={{ color: "#ccc" }}
                className="new-nav-item"
                activeClassName="nav-link-active"
                className="new-nav-link"
              >
                <ShopOutlined />
                &nbsp; Prodavnica
              </NavLink>
            </li>
            <li className="new-nav-ul-item">
              <NavLink
                className="new-nav-link"
                // style={{ color: "#ccc" }}
                to="/cart"
                activeClassName="nav-link-active"
                className="new-nav-link"
              >
                <ShoppingCartOutlined />
                &nbsp; Korpa
                <Badge count={cart.length} offset={[8, -20]}></Badge>
              </NavLink>
            </li>

            {!user && (
              <li className="new-nav-ul-item">
                {" "}
                <NavLink
                  // style={{ color: "#ccc" }}
                  to="/signup"
                  activeClassName="nav-link-active"
                  className="new-nav-link"
                >
                  <UserAddOutlined />
                  &nbsp; Registracija
                </NavLink>
              </li>
            )}

            {!user && (
              <li className="new-nav-ul-item">
                <Link
                  to="#"
                  onClick={showModal}
                  style={{ color: "#bbb" }}
                  className="new-nav-link"
                >
                  <UserOutlined />
                  &nbsp; Prijava
                </Link>
              </li>
            )}

            {user && (
              <li
                className="new-nav-ul-item"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link
                  to="#"
                  // style={{ color: "#ccc" }}
                  className="new-nav-link dropdown-trigger"
                  style={{
                    color: dropdown && "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* <img src={user.picture[0]} alt="" /> */}
                  {user.displayName ||
                    user.name ||
                    (user.email && user.email.split("@")[0])}
                  <div className="image-container">
                    <img
                      src={"../../../../images/profile-placeholder.png"}
                      style={{
                        width: "2em",
                        height: "2em",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                </Link>
                {dropdown && (
                  <AnimatePresence>
                    <motion.ul
                      key="dropdown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      exit={{ opacity: 0 }}
                      className="dropdown"
                    >
                      {user && user.role === "subscriber" && (
                        <li className="dropdown-item">
                          <Link
                            to="/user/history"
                            className="dropdown-item-link"
                          >
                            Upravljačka ploča
                          </Link>
                        </li>
                      )}

                      {user && user.role === "admin" && (
                        <li className="dropdown-item">
                          <Link
                            to="/admin/dashboard"
                            className="dropdown-item-link"
                          >
                            Admin Upravljačka ploča
                          </Link>
                        </li>
                      )}

                      <li className="dropdown-item">
                        <Link
                          to="#"
                          onClick={logout}
                          className="dropdown-item-link"
                        >
                          <LogoutOutlined />
                          &nbsp; Odjava
                        </Link>
                      </li>
                    </motion.ul>
                  </AnimatePresence>
                )}
              </li>
            )}
          </div>
        </ul>
      </div>

      {/* <div className="horizontal-nav ">
        <Menu
          className=""
          style={{
            background: "#00002266",
            backdropFilter: "blur(0.3em) brightness(60%)",
            color: "#ccc",

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
            <Menu.Item
              key="register"
              style={{ color: "#ccc" }}
              className="float-right"
              icon={<UserAddOutlined />}
            >
              <NavLink
                style={{ color: "#ccc" }}
                to="/signup"
                // activeClassName="nav-link-active"
                // className="n-link"
              >
                Registracija
              </NavLink>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item
              style={{ color: "#ccc" }}
              key="login"
              className="float-right"
              icon={<UserOutlined />}
            >
              <NavLink to="#" onClick={showModal} style={{ color: "#bbb" }}>
                Prijava
              </NavLink>
            </Menu.Item>
          )}

          {user && (
            <SubMenu
              style={{ color: "#ccc" }}
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
          <Menu.Item
            className="float-right"
            icon={<ShoppingCartOutlined />}
            style={{ color: "#ccc" }}
          >
            <NavLink
              style={{ color: "#ccc" }}
              to="/cart"
              // activeClassName="nav-link-active"
              // className="n-link"
            >
              Korpa
              <Badge count={cart.length} offset={[6, -9]}></Badge>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            className="float-right"
            style={{ color: "#ccc" }}
            icon={<ShopOutlined />}
          >
            <NavLink
              to="/products/filter"
              style={{ color: "#ccc" }}
              // activeClassName="nav-link-active"
              // className="n-link"
            >
              Prodavnica
            </NavLink>
          </Menu.Item>
        </Menu>
      </div> */}
    </>
  );
};

export default Header;

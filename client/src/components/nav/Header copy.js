import React, { useState } from "react";
import { Modal, Menu, Badge, Button } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

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
        transitionName=""
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.8" }}
        title="Prijava"
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
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
              className="width-90 form-control input-no-bg"
              id="email"
            />
            <label htmlFor="password" className="auth-input-label">
              Password
            </label>
            <input
              type="password"
              className="width-90 form-control input-no-bg "
              id="password"
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
        </div>
      </Modal>
      <div className="horizontal-nav">
        <Menu
          style={{ background: "#131d25a2" }}
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/">
              <img
                className="sava-logo"
                src="https://res.cloudinary.com/sale01/image/upload/v1623669939/assets/shopsavaba-logo-white-shadow.png"
                alt=""
              />
            </Link>
          </Menu.Item>
          {!user && (
            <Menu.Item
              key="register"
              icon={<UserAddOutlined />}
              className="float-right"
            >
              <Link to="/signup">Registracija</Link>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item
              key="login"
              icon={<UserOutlined />}
              className="float-right"
            >
              <Link to="#" onClick={showModal}>
                Prijava
              </Link>
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
          <Menu.Item icon={<ShoppingCartOutlined />} className="float-right">
            <Link to="/cart">
              <Badge count={cart.length} offset={[9, 0]}>
                Korpa
              </Badge>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Header;

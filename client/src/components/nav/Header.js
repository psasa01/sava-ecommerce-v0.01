import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let history = useNavigate();
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

  return (
    <div className="horizontal-nav">
      <Menu
        style={{ background: "#cfdfef" }}
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
            <Link to="/signin">Prijava</Link>
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
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import DelayLink from "react-delay-link";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/dashboard" className="nav-link">
          <div className="nav-link">Upravljačka ploča</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/product" className="nav-link">
          <div className="nav-link">Proizvod</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/products">
          <div className="nav-link">Proizvodi</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/table">
          <div className="nav-link">Tabela Proizvoda</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/category" className="nav-link">
          <div className="nav-link">Kategorija</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/sub" className="nav-link">
          <div className="nav-link">Podkategorija</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/admin/coupon" className="nav-link">
          <div className="nav-link">Kupon</div>
        </DelayLink>
      </li>
      <li className="nav-item">
        <DelayLink delay={300} to="/user/password" className="nav-link">
          <div className="nav-link">Šifra</div>
        </DelayLink>
      </li>
    </ul>
  </nav>
);

export default AdminNav;

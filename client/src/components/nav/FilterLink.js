import React from "react";
import { Link } from "react-router-dom";

const FilterLink = () => {
  return (
    <Link
      to={{
        pathname: "/products/filter",
        state: { from: "nista" },
      }}
    >
      <div className="cta">
        <h2>POSJETITE PRODAVNICU</h2>
      </div>
    </Link>
  );
};

export default FilterLink;

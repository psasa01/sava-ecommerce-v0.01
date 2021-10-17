import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      {window.location.href.substring(window.location.href.length - 3) ===
      "sub" ? (
        <label>Unesite naziv nove podkategorije</label>
      ) : window.location.href.substring(window.location.href.length - 3) ===
        "ory" ? (
        <label>Unesite naziv nove kategorije</label>
      ) : window.location.href.substring(window.location.href.length - 3) !==
          "cat" &&
        window.location.href.substring(window.location.href.length - 3) !==
          "sub" &&
        window.location.href.includes("sub") ? (
        <label>Unesite novi naziv za podkategoriju</label>
      ) : window.location.href.substring(window.location.href.length - 3) !==
          "cat" &&
        window.location.href.substring(window.location.href.length - 3) !==
          "sub" &&
        window.location.href.includes("category") ? (
        <label>Unesite novi naziv za kategoriju</label>
      ) : (
        <label>Nema nista od ovoga</label>
      )}

      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />

      {window.location.href.substring(window.location.href.length - 3) ===
      "sub" ? (
        <button className="btn btn-outline-primary">
          Spremite Podkategoriju
        </button>
      ) : window.location.href.substring(window.location.href.length - 3) ===
        "ory" ? (
        <button className="btn btn-outline-primary">Spremite Kategoriju</button>
      ) : window.location.href.substring(window.location.href.length - 3) !==
          "cat" &&
        window.location.href.substring(window.location.href.length - 3) !==
          "sub" &&
        window.location.href.includes("sub") ? (
        <button className="btn btn-outline-primary">
          Spremite Uredjenu Podkategoriju
        </button>
      ) : window.location.href.substring(window.location.href.length - 3) !==
          "cat" &&
        window.location.href.substring(window.location.href.length - 3) !==
          "sub" &&
        window.location.href.includes("category") ? (
        <button
          className="btn btn-outline-primary"
          style={{ fontWeight: "400" }}
        >
          Spremite Uređenu Kategoriju
        </button>
      ) : (
        <label>Nema nista od ovoga</label>
      )}

      {/* {window.location.href.substring(window.location.href.length - 3) !==
      "ory" ? (
        <button className="btn btn-outline-primary">
          Spremite Podkategoriju
        </button>
      ) : (
        <button className="btn btn-outline-primary">Spremite Kategoriju</button>
      )} */}
    </div>
  </form>
);

export default CategoryForm;

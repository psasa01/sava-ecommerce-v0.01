import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  // STEP 3
  // HANDLE SEARCH

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  // STEP 2
  // Input Field
  const { href } = window.location;
  return (
    <div>
      {href.substring(href.length - 3) === "sub" ? (
        <input
          type="search"
          placeholder="Unesite naziv podkategorije za pretragu"
          value={keyword}
          onChange={handleSearchChange}
          className="form-control mb-4"
        />
      ) : (
        <input
          type="search"
          placeholder="Unesite naziv kategorije za pretragu"
          value={keyword}
          onChange={handleSearchChange}
          className="form-control mb-4"
        />
      )}
    </div>
  );
};

export default LocalSearch;

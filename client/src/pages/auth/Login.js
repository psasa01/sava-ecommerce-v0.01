import React from "react";

const Login = () => {
  return (
    <>
      <br />
      {/* <div className="container"> */}
      <div className="login-form-container">
        <div className="login-form-left">
          <input type="text" className="form-control input-no-bg" />
          <input type="text" className="form-control input-no-bg" />
        </div>
        <div className="login-form-right">
          <button
            // disabled={}
            type="submit"
            className="btn btn-raised login-form-button"
          >
            Potvrda Registracije
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

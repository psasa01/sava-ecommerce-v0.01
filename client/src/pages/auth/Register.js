import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import BackButton from "../../components/nav/BackButton";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  // const history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Poslali smo email na ${email}. Molimo Vas da pratite link da bi zavrsili registraciju`
    );

    // save users email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <div
      className="reg-form-container"
      style={{
        top: "3.6em",
        width: "44vw",
        padding: "0 3em 1em 3em",
        borderRadius: "2em",
      }}
    >
      <br />
      <span className="reg-form-title-text">
        Unesite email adresu za registraciju
      </span>
      <br />
      <div
        style={{
          width: "",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <hr style={{ paddingTop: ".5em" }} />
        <br />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control input-no-bg"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Vaša email adresa"
                  autoFocus
                />
              </div>

              {/* <div className="form-group">
        <label for="password">Enter Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          value={password}
        />
      </div> 
      <div className="form-group">
        <label for="password-confirm">Confirm Password</label>
        <input
          type="password"
          id="password-confirm"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
          value={confirmPassword}
        />
      </div> */}
              <p
                style={{
                  color: "#558855",
                  fontSize: "1em",
                  lineHeight: "1.4em",
                  padding: ".75em",
                  width: "100%",
                  textAlign: "center",
                  right: "0",
                  marginBottom: "1em",
                  backgroundColor: "white",
                }}
              >
                Nakon što potvrdite slanje, potrebno je da provjerite email koji
                ste unijeli. <br />
                Uskoro ćemo Vam poslati link na kojem možete dovršiti
                registraciju{" "}
              </p>
              <button type="submit" className="btn btn-raised reg-button-right">
                Pošaljite email
              </button>
              <p className="auth-p2">
                Već ste registrovani?&nbsp;
                <Link to="/signin">Prijavite se!</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="register-bg">
      <BackButton />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">{registerForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Register;

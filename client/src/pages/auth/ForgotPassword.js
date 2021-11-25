import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import BackButton from "../../components/nav/BackButton";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          "You successfully submited the email. check your email for password reset link!"
        );
        // history.push("/signin");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        setEmail("");
      });
  };

  return (
    <div className="register-bg">
      <BackButton />
      <div className="container p-5">
        <div className="row">
          <div className="container col-md-6 offset-md-3 p-5">
            <div
              className="reg-form-container"
              style={{
                top: "0em",
                width: "44vw",
                padding: "0 3em 1em 3em",
                borderRadius: "2em",
              }}
            >
              <br />
              <span className="reg-form-title-text">
                Unesite email adresu za promjenu šifre
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
                        <label
                          htmlFor="email"
                          style={{
                            fontSize: "1em",
                            color: "#999",
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control input-no-bg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Vaš email"
                          autoFocus
                        />
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
                          Nakon što potvrdite slanje, potrebno je da provjerite
                          email koji ste unijeli. <br />
                          Uskoro ćemo Vam poslati link na kojem možete dovršiti
                          promjenu šifre{" "}
                        </p>
                        <button
                          className="btn btn-raised reg-button-right"
                          disabled={!email}
                        >
                          Pošaljite email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

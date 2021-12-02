import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "./../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

import BackButton from "../../components/nav/BackButton";

// const createOrUpdateUser = async (authtoken) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API}/create-or-update-user`,
//     {},
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

// createOrUpdateUser();

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // const history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
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

  const facebookLogin = async () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
        const { user, credential } = result;
        let accessToken = credential.accessToken;
        console.log("acccesss tokkkennn", accessToken);
        const idTokenResult = await user.getIdTokenResult();
        console.log("getidresukt", idTokenResult.token);
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("rereeeeeessss", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: user.email,
                email: user.email,
                token: idTokenResult.token,
                role: "user",
                _id: user.uid,
                firebase: res.data.firebase,
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
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdToken(true);
        console.log("true", idTokenResult);

        createOrUpdateUser(idTokenResult)
          .then((res) => {
            console.log("rrreeesss from ggolfg;le", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
                role: res.data.role,
                _id: res.data._id,
                firebase: res.data.firebase,
                picture: res.data.picture,
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
  };

  const loginForm = () => (
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
        Unesite Vaše pristupne podatke
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
                  // type="email"
                  className="form-control input-no-bg"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Vaš Email"
                  autoFocus
                />
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "1em",
                    color: "#999",
                  }}
                >
                  Šifra
                </label>
                <input
                  type="password"
                  className="form-control input-no-bg"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Vaša Šifra"
                />
                <Link to="/forgot/password">
                  <p className="auth-p">Zaboravili ste šifru?</p>
                </Link>
                <button
                  // disabled={}
                  type="submit"
                  className="btn btn-raised reg-button-right"
                  disabled={!email || password.length < 6}
                  onClick={handleSubmit}
                >
                  Prijava
                </button>

                <p className="auth-p2">
                  Niste registrovani?&nbsp;
                  <Link to="/signup">Registrujte se!</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="social-login-buttons-container">
        <div className="google-button-container">
          <button
            style={{ backgroundColor: "#cf4332", width: "90% !important" }}
            onClick={googleLogin}
            className="btn btn-raised google-button-login"
          >
            <GoogleOutlined /> Google Prijava
          </button>
        </div>
        <div className="google-button-container">
          <button
            style={{ backgroundColor: "#cf4332", width: "90% !important" }}
            onClick={facebookLogin}
            className="btn btn-raised facebook-button-login"
          >
            <GoogleOutlined /> Facebook Prijava
          </button>
        </div>
      </div>
    </div>
  );
  // if (loading) {
  //   return <h1>LOADING...</h1>;
  // }
  return (
    <div className="register-bg">
      <BackButton />
      <div className="container p-5">
        <div className="row">{loginForm()}</div>
      </div>
    </div>
  );
};

export default Login;

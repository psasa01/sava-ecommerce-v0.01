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

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
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

  const facebookLogin = async () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
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
    <form onSubmit={handleSubmit} style={{ marginBottom: "2.5em" }}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          value={password}
          placeholder="Šifra"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Prijava
      </Button>

      <Button
        onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        Google Prijava
      </Button>

      <Button
        onClick={facebookLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        Facebook Prijava
      </Button>

      <Link to="/forgot/password" className="float-right">
        Zaboravili ste šifru?
      </Link>
    </form>
  );
  // if (loading) {
  //   return <h1>LOADING...</h1>;
  // }
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Prijava</h4>
          )}

          {loginForm()}
          <hr style={{ marginBottom: "1.3em" }} />
          <Link to="/signup">
            <Button
              type="primary"
              className="mb-3"
              block
              shape="round"
              size="large"
            >
              <b>REGISTRACIJA</b>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

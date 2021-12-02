import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrUpdateUserEmailPass } from "../../functions/auth";

import { motion } from "framer-motion";
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

let initialValues = {
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
  address: "",
  phone: "",
  poNum: "",
  city: "",
};

const RegisterComplete = () => {
  const history = useHistory();

  const [values, setValues] = useState(initialValues);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [poNum, setPoNum] = useState("");
  // const [city, setCity] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // let { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setValues({
      ...values,
      email: window.localStorage.getItem("emailForRegistration"),
      password: "",
      name: "",
      confirmPassword: "",
      address: "",
      city: "",
      poNum: "",
      phone: "",
    });
    // setEmail(window.localStorage.getItem("emailForRegistration"));
    // setPassword("");
    // setName("");
    // setConfirmPassword("");
  }, []);

  const { href } = window.location; //web address with auth token

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation
      // email password
      if (!values.email || !values.password) {
        toast.error("Email and password are required!");
        return;
      }
      //password length
      if (values.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      // check password confirm
      if (values.password !== values.confirmPassword) {
        toast.error("Password and password confirmation must match!");
        return;
      }
      const result = await auth.signInWithEmailLink(values.email, href);

      // chek if the email is verified
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get current user
        const user = auth.currentUser;

        // update password and profile
        await user.updatePassword(values.password);
        await user.updateProfile({
          displayName: values.name,
          name: values.name,
          address: values.address,
          poNum: values.poNum,
          city: values.city,
          phone: values.phone,
        });

        // get user id token
        const idTokenResult = await user.getIdTokenResult();

        // redux store

        console.log("CREATE OR UPDATE USER TOKEN", idTokenResult);

        createOrUpdateUserEmailPass(values, idTokenResult.token)
          .then((res) => {
            console.log("JEBENI USER", user.displayName);
            console.log("JEBENI RES", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                firebase: res.data.firebase,
                name: values.name,
                email: values.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                address: values.address,
                poNum: values.poNum,
                phone: values.phone,
              },
            });

            toast.success("Uspjesno ste se registrirali i prijavili");
          })
          .catch();

        // redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <motion.div
      key={"complete-reg-form"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      exit={{ opacity: 0 }}
      className="reg-form-container"
    >
      <div className="reg-form-title">
        <span className="reg-form-title-text">
          Unesite Vaše podatke za registraciju
        </span>
        <br />
        <hr style={{ width: "99%", position: "relative", left: "0.5%" }} />
        <br />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="form-group col-md-6">
                  <label>
                    Email adresa <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    className="form-control input-no-bg"
                    id="email"
                    value={values.email}
                    disabled
                    name="email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Korisničko ime <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    autoComplete="off"
                    value={values.name}
                    placeholder=""
                    type="text"
                    id="name"
                    onChange={handleChange}
                    className="form-control input-no-bg"
                    name="name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>
                    Šifra <span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <input
                    autoComplete="off"
                    value={values.password}
                    placeholder=""
                    type="password"
                    className="form-control input-no-bg"
                    onChange={handleChange}
                    name="password"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Potvrdite šifru <span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <input
                    autoComplete="off"
                    value={values.confirmPassword}
                    placeholder=""
                    type="password"
                    className="form-control input-no-bg"
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Adresa</label>
                  <input
                    autoComplete="off"
                    value={values.address}
                    placeholder=""
                    type="text"
                    id="address"
                    onChange={handleChange}
                    className="form-control input-no-bg"
                    name="address"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Telefon</label>
                  <input
                    autoComplete="off"
                    value={values.phone}
                    placeholder=""
                    type="text"
                    id="phone"
                    onChange={handleChange}
                    name="phone"
                    className="form-control input-no-bg"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-2">
                  <label>Poštanski broj</label>
                  <input
                    autoComplete="off"
                    value={values.poNum}
                    placeholder=""
                    type="text"
                    id="poNum"
                    onChange={handleChange}
                    className="form-control input-no-bg"
                    name="poNum"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Grad</label>
                  <input
                    autoComplete="off"
                    value={values.city}
                    placeholder=""
                    type="text"
                    id="address"
                    onChange={handleChange}
                    className="form-control input-no-bg"
                    name="city"
                  />
                </div>
                <div className="reg-button-container col-md-6">
                  <button
                    // disabled={}
                    type="submit"
                    className="btn btn-raised reg-button-right"
                  >
                    Potvrda Registracije
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );

  return (
    <>
      {/* <div className="container"> */}
      <div className="register-bg">
        <div className="row">
          <div className="col-md-12">{completeRegistrationForm()}</div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RegisterComplete;

import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

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

const RegisterComplete = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [poNum, setPoNum] = useState("");
  const [city, setCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // let { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    setPassword("");
    setName("");
    setConfirmPassword("");
  }, []);

  const { href } = window.location; //web address with auth token
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation
      // email password
      if (!email || !password) {
        toast.error("Email and password are required!");
        return;
      }
      //password length
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      // check password confirm
      if (password !== confirmPassword) {
        toast.error("Password and password confirmation must match!");
        return;
      }
      const result = await auth.signInWithEmailLink(email, href);

      // chek if the email is verified
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get current user
        const user = auth.currentUser;

        // update password and profile
        await user.updatePassword(password);
        await user.updateProfile({ displayName: name });

        // get user id token
        const idTokenResult = await user.getIdTokenResult();

        // redux store

        console.log("CREATE OR UPDATE USER TOKEN", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("JEBENI USER", user.displayName);
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
                    type="email"
                    className="form-control input-no-bg"
                    value={email}
                    id="email"
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Korisničko ime <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    autoComplete="off"
                    value={name}
                    placeholder=""
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control input-no-bg"
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
                    value={password}
                    placeholder=""
                    type="password"
                    className="form-control input-no-bg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Potvrdite šifru <span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <input
                    autoComplete="off"
                    value={confirmPassword}
                    placeholder=""
                    type="password"
                    className="form-control input-no-bg"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Adresa</label>
                  <input
                    autoComplete="off"
                    value={address}
                    placeholder=""
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control input-no-bg"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Telefon</label>
                  <input
                    autoComplete="off"
                    value={phone}
                    placeholder=""
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control input-no-bg"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-2">
                  <label>Poštanski broj</label>
                  <input
                    autoComplete="off"
                    value={poNum}
                    placeholder=""
                    type="text"
                    id="poNum"
                    onChange={(e) => setPoNum(e.target.value)}
                    className="form-control input-no-bg"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Grad</label>
                  <input
                    autoComplete="off"
                    value={city}
                    placeholder=""
                    type="text"
                    id="address"
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control input-no-bg"
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

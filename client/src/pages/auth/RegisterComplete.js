import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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

const RegisterComplete = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          id="email"
          disabled
        />
      </div>
      <div className="form-group">
        <label>User name</label>
        <input
          autoComplete="off"
          value={name}
          placeholder="Please enter your username"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          autoComplete="off"
          value={password}
          placeholder="Please enter your password"
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          autoComplete="off"
          value={confirmPassword}
          placeholder="Please confirm your password"
          type="password"
          className="form-control"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

import Amplify, { Auth } from "aws-amplify";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";
import "../Signup/signup.css";
import "../../App.css";
//import awsconfig from "../../aws-exports";
import { getJWT, verifyPassword } from "../../utils";
import AuthContext from "../../context/AuthContext";
import { CONFIRM_SIGNUP, SIGNIN } from "../../constants/pageRoutes";
import { ENTER_PASSWORD, ENTER_EMAIL } from "../../constants/errors";

const Signup = () => {
  const emailRef = useRef();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (!userName) {
        setErrorMessage(ENTER_EMAIL);
        return;
      }
      if (!password) {
        setErrorMessage(ENTER_PASSWORD);
        return;
      }
      const passwordError = verifyPassword(password);
      if (passwordError) {
        setErrorMessage(passwordError);
        return;
      }
      setErrorMessage(null);
      await Auth.signUp({
        username: userName,
        password: password,
        attributes: {
          email: userName,
        },
      });

      const JWTvalue = getJWT();

      if (typeof JWTvalue === "undefined" || JWTvalue === "") {
        return;
      }
      authContext.loginStateHandler();
      //Persisting the login state.
      localStorage.setItem("loginState", authContext.loginState);
      navigate(CONFIRM_SIGNUP, { replace: true, state: userName });
    } catch (err) {
      setErrorMessage(err.message);
      authContext.logoutStateHandler();
      localStorage.removeItem("loginState");
      throw Error(err);
    }
  };
  return (
    <div className="container signup-outer">
      <div className="col-md-4 signup-card">
        <form className="signup-form" onSubmit={signUp}>
          <div className="signup-card-content">
            <h1>Sign Up</h1>
            <p>Create your account for Visa Application.</p>
          </div>

          {errorMessage && (
            <p className="error-message" aria-live="assertive">
              {errorMessage}
            </p>
          )}

          <div className="input-element">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              className="form-control"
              placeholder="Enter Email"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-element">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            htmlType="submit"
            style={{ backgroundColor: "blue", color: "white" }}
            block
          >
            Next
          </Button>
          <p className="signup-bottom-link">
            Already have an account? Login
            <Link to={SIGNIN} className="signup-link">
              {" "}
              here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

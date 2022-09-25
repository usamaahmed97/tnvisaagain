import React, { useState, useRef, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
// import { ADMIN_QUERIES, ADD_USER_TO_GROUP } from "../../api/AdminQueriesAPI";
import { Button } from "antd";
import "./confirmSignup.css";
import { DASHBOARD } from "../../constants/pageRoutes";
import { RECEIVE_AUTHENTICATION_CODE } from "../../constants/errors";

const ConfirmSignup = () => {
  const [username, setUsername] = useState("");
  const [authenticationCode, setAuthenticationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const codeRef = useRef();

  useEffect(() => {
    codeRef.current.focus();
    setUsername(location.state);
  }, []);

  const confirmRegister = async (e) => {
    e.preventDefault();
    try {
      if (!authenticationCode) {
        setErrorMessage(RECEIVE_AUTHENTICATION_CODE);
        return;
      }

      //Email passed from Navigate state.
      await Auth.confirmSignUp(username, authenticationCode);
      const temp = await Auth.currentSession();
      localStorage.setItem("CognitoUserSession", JSON.stringify(temp));
      // addToGroup(username, "applicant");
      navigate(DASHBOARD);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // const addToGroup = async (userEmail, groupName) => {
  //   let apiName = ADMIN_QUERIES;
  //   let path = ADD_USER_TO_GROUP;
  //   let myInit = {
  //     body: {
  //       username: userEmail,
  //       groupname: groupName,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${(await Auth.currentSession())
  //         .getAccessToken()
  //         .getJwtToken()}`,
  //     },
  //   };
  //   await API.post(apiName, path, myInit);
  // };

  return (
    <div className="container confirm-signup-outer">
      <div className="col-md-4 confirm-signup-card">
        <form className="confirm-signup-form" onSubmit={confirmRegister}>
          <div className="confirm-signup-card-content">
            <h1>2 FA</h1>
            <p>
              Enter a security code generated by your two-factor authentication
              app to verify it's you.
            </p>
          </div>
          {errorMessage && (
            <p className="error-message" aria-live="assertive">
              {errorMessage}
            </p>
          )}
          <div className="input-element">
            <label>Email </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="abc@xyz.com"
              value={location.state}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-element">
            <label>Authentication Code </label>
            <input
              type="text"
              id="authentication-code"
              className="form-control"
              placeholder="Enter Authentication Code"
              value={authenticationCode}
              ref={codeRef}
              onChange={(e) => setAuthenticationCode(e.target.value)}
              required
            />
          </div>

          <Button
            htmlType="submit"
            style={{ backgroundColor: "blue", color: "white" }}
            block
          >
            Confirm Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignup;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button } from "antd";
import "./resetPassword.css";

import {
  ENTER_EMAIL,
  ENTER_0LD_PASSWORD,
  ENTER_NEW_PASSWORD,
} from "../../constants/errors";
import { verifyNewPassword } from "../../utils";
import { DASHBOARD } from "../../constants/pageRoutes";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();

  //To focus the email input field on first render.
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      //Form Validation

      if (!username) {
        setErrorMessage(ENTER_EMAIL);
        return;
      }
      if (!oldPassword) {
        setErrorMessage(ENTER_0LD_PASSWORD);
        return;
      }
      if (!newPassword) {
        setErrorMessage(ENTER_NEW_PASSWORD);
        return;
      }
      const newPasswordError = verifyNewPassword(newPassword);
      if (newPasswordError) {
        setErrorMessage(newPasswordError);
        return;
      }

      setErrorMessage(null);
      //Getting the current authenticated user info.
      const userInfo = await Auth.currentAuthenticatedUser();
      //Amplify changePassword function.
      await Auth.changePassword(userInfo, oldPassword, newPassword);
      navigate(DASHBOARD);
    } catch (error) {
      setErrorMessage(error.message);
      throw Error(error);
    }
  };

  return (
    <div className="container reset-password-outer">
      <div className="col-md-4 reset-password-card">
        <form className="reset-password-form" onSubmit={resetPassword}>
          <h1>Reset Password</h1>

          {errorMessage && (
            <p className="error-message" aria-live="assertive">
              {errorMessage}
            </p>
          )}

          <div className="reset-password-card-content">
            <label>Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="abc@xyz.com"
              ref={emailRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signin-card-content">
            <label>Old Password </label>
            <input
              type="password"
              id="old-password"
              className="form-control"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="signin-card-content">
            <label>New Password </label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <Button
            htmlType="submit"
            style={{ backgroundColor: "blue", color: "white" }}
            block
          >
            Confirm Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

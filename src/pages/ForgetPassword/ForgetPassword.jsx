import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Auth } from "aws-amplify";
import "../ForgetPassword/forgetPassword.css";
import { verifyNewPassword } from "../../utils";
import { SIGNIN } from "../../constants/pageRoutes";
import {
  CORRECT_EMAIL,
  EMAIL_NOT_FOUND,
  ENTER_EMAIL,
  ENTER_NEW_PASSWORD,
  RECEIVE_CONFIRMATION_CODE,
} from "../../constants/errors";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  //To auto focus the email field.
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const sendConfirmationCode = async (e) => {
    e.preventDefault();
    try {
      //Validation
      if (!email) {
        setErrorMessage(ENTER_EMAIL);
        return;
      }

      await Auth.forgotPassword(email);
      setErrorMessage("");
      setIsCodeSent(true);
    } catch (error) {
      error.message === EMAIL_NOT_FOUND
        ? setErrorMessage(CORRECT_EMAIL)
        : setErrorMessage(error.message);
      throw Error(error);
    }
  };

  const setCodeAndNewPassword = async (e) => {
    e.preventDefault();

    try {
      //Validations
      if (!confirmationCode) {
        setErrorMessage(RECEIVE_CONFIRMATION_CODE);
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

      await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
      setErrorMessage("");
      navigate(SIGNIN);
    } catch (error) {
      setErrorMessage(error.message);
      throw Error(error);
    }
  };

  return (
    <div className="container forget-password-outer">
      <div className="col-md-4 forget-password-card">
        {isCodeSent ? (
          <form
            className="forget-password-form"
            onSubmit={setCodeAndNewPassword}
          >
            <h1>Enter Confirmation Code and New Password.</h1>
            {errorMessage && (
              <p className="error-message" aria-live="assertive">
                {errorMessage}
              </p>
            )}
            <div className="forget-password-card-content">
              <label>Enter Confirmation Code received via Email</label>
              <input
                type="text"
                id="confirmation-code"
                className="form-control"
                placeholder="Enter Confirmation Code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>
            <div className="forget-password-card-content">
              <label>Enter New Password</label>
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

            <Button htmlType="submit" className="send-code-button" block>
              Confirm New Password
            </Button>
          </form>
        ) : (
          <form
            className="forget-password-form"
            onSubmit={sendConfirmationCode}
          >
            <h1>Forgot Password</h1>
            {errorMessage && (
              <p className="error-message" aria-live="assertive">
                {errorMessage}
              </p>
            )}
            <div className="forget-password-card-content">
              <label>Enter the Email Associated with the account</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="abc@xyz.com"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button htmlType="submit" className="send-code-button" block>
              Send Code
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

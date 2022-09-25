import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import logo from "../../images/logo.png";
import { Typography, Input, Form, Item, Button, Checkbox } from "antd";
import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, FORGET_PASSWORD } from "../../constants/pageRoutes";
import { getJWT, getUserGroups, getFacebookJWT } from "../../utils";
import "./signin.css";
import {
  ENTER_PASSWORD,
  ENTER_EMAIL,
  INVALID_CREDENTIALS,
  USER_NOT_EXIST,
} from "../../constants/errors";

import {
  FacebookFilled,
  MailOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

function Signin() {
  //Sign in email and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthContext);
  //For O-Auth 2.0 -- Facebook
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         setUser(data);
  //         break;
  //       case "signOut":
  //         setUser(null);
  //         break;
  //       case "customOAuthState":
  //         setCustomState(data);
  //     }
  //   });

  //   Auth.setPreferredMFA(user, "NOMFA");
  //   Auth.currentAuthenticatedUser()
  //     .then((currentUser) => setUser(currentUser))
  //     .catch((error) => {
  //       console.log("Not signed in");
  //       throw Error(error);
  //     });
  //   return unsubscribe;
  // }, []);

  const login = async (e) => {
    try {
      if (!username) {
        setErrorMessage(ENTER_EMAIL);
        return;
      }
      if (!password) {
        setErrorMessage(ENTER_PASSWORD);
        return;
      }
      setErrorMessage(null);

      const user1 = await Auth.signIn({
        username: username,
        password: password,
      });

      console.log("signin user object: ", user1);

      const sessionInfo = await Auth.currentSession();
      console.log("SessionInfo", sessionInfo);

      const JWTvalue = await getJWT();
      console.log("JWTvalue Variable:", JWTvalue);
      //Validation
      if (typeof JWTvalue === "undefined" || JWTvalue === "") {
        return;
      }

      authContext.loginStateHandler();
      //Persisting the login state.
      localStorage.setItem("loginState", authContext.loginState);
      const userGroups = getUserGroups();
      navigate(DASHBOARD);
    } catch (err) {
      err.message === USER_NOT_EXIST
        ? setErrorMessage(INVALID_CREDENTIALS)
        : setErrorMessage(err.message);
      authContext.logoutStateHandler();
      localStorage.removeItem("loginState");
      throw Error(err);
    }
  };

  // O-Auth 2.0 -- Sign in with Facebook
  const signInwithFacebook = async () => {
    const facebookInfo = await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });

    console.log("signin user object: ", facebookInfo);

    const sessionInfo = await Auth.currentSession();
    console.log("SessionInfo", sessionInfo);

    const JWTvalue = await getJWT();
    console.log("JWTvalue Variable:", JWTvalue);
  };

  const signInwithGoogle = async () => {
    const googleUser = await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });

    console.log("signin user object: ", googleUser);

    const sessionInfo = await Auth.currentSession();
    console.log("SessionInfo", sessionInfo);

    const JWTvalue = await getJWT();
    console.log("JWTvalue Variable:", JWTvalue);
  };

  const goToDasboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="signin-outer">
      <div className="signin-card">
        <div className="signin-logo">
          <div className="logo">
            <img alt="tnvisa_logo" src={logo} />
          </div>
        </div>
        <div className="sigin-content">
          <h2>Sign In</h2>
          <Typography id="desc">
            Enter your credentials to access your account
          </Typography>
        </div>
        <Form
          name="normal_login"
          className="signin-form"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
        >
          {errorMessage && (
            <p className="error-message" aria-live="assertive">
              {errorMessage}
            </p>
          )}

          <div className="signin-card-content" id="email-field">
            <div className="label">Username</div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: ENTER_EMAIL,
                },
              ]}
            >
              <Input
                type="email"
                id="email"
                placeholder="abc@xyz.com"
                ref={emailRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                addonAfter={<MailOutlined />}
              />
            </Form.Item>
          </div>

          <div className="signin-card-content" id="password-field">
            <div className="label">Password </div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: ENTER_PASSWORD,
                },
              ]}
            >
              <Input.Password
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Item>
          </div>
          <div className="rememberme-forgot">
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="login-form-remember ">
                  Remember me
                </Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href={FORGET_PASSWORD}>
                Forgot your password?
              </a>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              className="signin-button"
              htmlType="submit"
              type="primary"
              size="large"
              shape="standard"
              state="normal"
              title="signin"
              id="simple-signin"
              block
            >
              <Typography>Sign In</Typography>
            </Button>
          </Form.Item>
        </Form>
        <p>or</p>

        <Button
          className="facebook-button"
          htmlType="submit"
          type="primary"
          size="large"
          shape="standard"
          state="normal"
          title="signin"
          id="facebook"
          onClick={signInwithFacebook}
          block
        >
          <FacebookFilled />
          <Typography>Sign in with Facebook</Typography>
        </Button>

        <Button
          className="google-button"
          htmlType="submit"
          type="primary"
          size="large"
          shape="standard"
          state="normal"
          title="signin"
          id="google"
          onClick={signInwithGoogle}
          block
        >
          <GoogleOutlined />
          <Typography>Sign in with Google</Typography>
        </Button>
      </div>
    </div>
  );
}

export default Signin;

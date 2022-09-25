import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

//Check if you are in localhost or production
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const signInURI = awsExports.oauth.redirectSignIn.split(",");
const signOutURI = awsExports.oauth.redirectSignOut.split(",");

if (isLocalhost) {
  awsExports.oauth.redirectSignIn = signInURI[0];
  awsExports.oauth.redirectSignOut = signOutURI[0];
} else if (
  window.location.hostname === "https://master.d17rqxjq4nzn9i.amplifyapp.com"
) {
  awsExports.oauth.redirectSignIn = signInURI[1];
  awsExports.oauth.redirectSignOut = signOutURI[1];
} else {
  console.log("Not working");
}

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

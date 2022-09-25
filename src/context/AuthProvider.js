import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [appLanguage, setAppLanguage] = useState("en");

  //Authentication Methods
  const loginStateHandler = () => {
    setLoginState(true);
  };

  const logoutStateHandler = () => {
    setLoginState(false);
  };

  //Localization Methods
  const setLanguageToEnglish = () => {
    setAppLanguage("en");
  };

  const setLanguageToSpanish = () => {
    setAppLanguage("es");
  };

  return (
    <AuthContext.Provider
      value={{
        loginState,
        loginStateHandler,
        logoutStateHandler,
        setLanguageToEnglish,
        setLanguageToSpanish,
        appLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

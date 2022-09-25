import React from "react";

const AuthContext = React.createContext({
  //Authentication
  loginState: false,
  loginStateHandler: () => {},
  logoutStateHandler: () => {},
  //Localization
  appLanguage: "",
  setLanguageToEnglish: () => {},
  setLanguageToSpanish: () => {},
});

export default AuthContext;

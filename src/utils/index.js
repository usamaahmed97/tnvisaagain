import { Auth } from "aws-amplify";

export const verifyPassword = (password) => {
  if (password.length < 8) {
    return "Password must have at least eight characters.";
  }
  return;
};

export const verifyNewPassword = (password) => {
  if (password.length < 8) {
    return "New Password must have at least eight characters.";
  }
  return;
};

export const getJWT = async () => {
  try {
    const userCurrentSession = await Auth.currentSession();
    const accessToken = userCurrentSession.getAccessToken();
    const JWTvalue = accessToken.getJwtToken();
    return JWTvalue;
  } catch (error) {
    console.log(error);
  }
};

export const getFacebookJWT = async () => {
  try {
    const authUser = await Auth.currentAuthenticatedUser();
    const facebookJWT = authUser.signInUserSession.accessToken;
    return facebookJWT;
  } catch (error) {
    throw Error(error);
  }
};

export const getUserGroups = async () => {
  const authenticatedUser = await Auth.currentAuthenticatedUser();
  const groups =
    authenticatedUser.signInUserSession.accessToken.payload["cognito:groups"];
  return groups;
};

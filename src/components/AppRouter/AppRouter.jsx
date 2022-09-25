import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/Signin";
import ConfirmSignup from "../../pages/ConfirmSignup/ConfirmSignup";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DoesNotExist from "../../pages/DoesNotExist/DoesNotExist";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgetPassword from "../../pages/ForgetPassword/ForgetPassword";
import AuthProvider from "../../context/AuthProvider";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import PersistRoutes from "../PersistRoutes/PersistRoutes";
import {
  CONFIRM_SIGNUP,
  CUSTOMER_DETAILS,
  DASHBOARD,
  DOES_NOT_EXIST,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  SIGNIN,
  SIGNUP,
} from "../../constants/pageRoutes";
import CustomerDetails from "../../pages/CustomerDetails/CustomerDetails";

const AppRouter = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected Routes */}
            {/* <Route element={<PrivateRoutes />}>
              <Route path={DASHBOARD} element={<Dashboard />} exact />
              <Route path={RESET_PASSWORD} element={<ResetPassword />} />
            </Route> */}

            {/* Persisted Routes */}
            {/* <Route element={<PersistRoutes />}> */}
            <Route path={SIGNIN} element={<Signin />} />
            {/* </Route> */}

            {/* Public Routes */}
            <Route path={DASHBOARD} element={<Dashboard />} exact />
            <Route path={RESET_PASSWORD} element={<ResetPassword />} />

            <Route index path={SIGNUP} element={<Signup />} />
            <Route path={DOES_NOT_EXIST} element={<DoesNotExist />} />
            <Route path={CONFIRM_SIGNUP} element={<ConfirmSignup />} />
            <Route path={FORGET_PASSWORD} element={<ForgetPassword />} />
            <Route path={CUSTOMER_DETAILS} element={<CustomerDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default AppRouter;

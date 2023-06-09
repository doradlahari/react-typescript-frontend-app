import React, { useState } from "react";
import { RootProvider } from "./context/rootcontext";
import LoginForm from "./auth/login/login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupForm from "./auth/signup/signup";
import DashBoardPage from "./pages/dashboard/dashboard";
import Verification from "./auth/otpvalidating/otpvalidator";
import Forgotpassword from "./auth/forgotpassword/forgotpassword";
import ResetPasswordForm from "./auth/resetpassword/resetpassword";

interface AuthData {
  token: string;
}

const App: React.FC = () => {
  const [tokenValue, setTokenValue] = useState<AuthData>({
    token: "",
  });

  return (
    <RootProvider
      value={{
        tokenValue,
        setTokenValue,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/profile" element={<DashBoardPage />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route
            path="/resetpassword/:userId"
            element={<ResetPasswordForm />}
          />
        </Routes>
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;

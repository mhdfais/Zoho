import React from "react";
// import LoginForm from "@/components/authentication/LoginForm";

const handleConnectZoho = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/authorize`;
};

const Login = () => {
  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <img
              src="/images/auth/auth-cover-login-bg.svg"
              alt="img"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="auth-cover-sidebar-inner">
        <div className="auth-cover-card-wrapper">
          <div className="auth-cover-card p-sm-5">
            <div className="wd-50 mb-5">
              <img
                src="/images/logo-abbr.png"
                alt="img"
                className="img-fluid"
              />
            </div>
            {/* <LoginForm /> */}

            <div className="p-6 text-center ">
              <h2 className="text-xl font-semibold mb-4">
                Connect Zoho CRM to view your leads
              </h2>
              <button
                onClick={handleConnectZoho}
                className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Connect Zoho
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

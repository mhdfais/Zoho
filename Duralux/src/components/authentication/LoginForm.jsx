import axios from "axios";
import React, { useState } from "react";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   console.log("hiii");
  //   e.preventDefault();
  //   try {
  //     // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/zohoLogin`, {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({ email, password }),
  //     // });
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/zohoLogin`,
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     // const data = await res.json();
  //     // if (data.success) {
  //     //   console.log("Logged in!", data.token);
  //     //   // You can store token in redux/localStorage
  //     // } else {
  //     //   console.log("Login failed", data.message);
  //     // }
  //     console.log(res);
  //   } catch (error) {
  //     if (error.response) {
  //       // server responded with status outside 2xx
  //       console.log("Server error:", error.response.data);
  //     } else if (error.request) {
  //       // request was made but no response
  //       console.log("No response:", error.request);
  //     } else {
  //       console.log("Axios error:", error.message);
  //     }
  //   }
  // };

  return (
    <>
      <h2 className="fs-20 fw-bolder mb-4">Login</h2>
      <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
      <p className="fs-12 fw-medium text-muted">
        Thank you for get back <strong>Nelel</strong> web applications, let's
        access our the best recommendation for you.
      </p>
      <form onSubmit={handleLogin} className="w-100 mt-4 pt-2">
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email or Username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                </div> */}
        <div className="mt-5">
          <button type="submit" className="btn btn-lg btn-primary w-100">
            Login
          </button>
        </div>
      </form>
      {/* <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Facebook">
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Twitter">
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Github">
                        <FiGithub size={16} className='text' />
                    </a>
                </div>
            </div> */}
    </>
  );
};

export default LoginForm;

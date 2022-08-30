import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export const LoginPage = (props) => {
  const { setLogin } = props;
  console.log("props login===>", props);

  const handleLogin = () => {
    setLogin(true);
    localStorage.setItem("isLogin", true);
    props.history.push("/");
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form validate-form">
            <span className="login100-form-title p-b-43">Login</span>

            <div className="wrap-input100 validate-input" data-validate="Valid  is required: ex@abc.xyz" required>
              <input className="input100" type="text" placeholder="Purchase Group" />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="input100" type="password" name="pass" placeholder="Password" required />
              <span className="focus-input100"></span>
            </div>

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div>
                <a href="# " className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* <Link to="/"> */}
            <div className="container-login100-form-btn">
              <Button className="login100-form-btn" onClick={handleLogin}>
                Login
              </Button>
            </div>
            {/* </Link> */}
          </div>

          <div className="login100-more"></div>
        </div>
      </div>
    </div>
  );
};

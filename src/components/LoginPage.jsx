import react from "react";
import "./App.css";
import { Link } from "react-router-dom";
//import { Button } from 'primereact/button';
import { MaterialOverview } from "../components/MaterialOverview";

export const LoginPage = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        {/* <div>
        <img alt="Logo" src="images/logo-white.png" style={{width: '200px', margin: '0px 0px 15px'}}/>
       
      </div> */}
        <div className="wrap-login100">
          <div className="login100-form validate-form">
            <span className="login100-form-title p-b-43">Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid  is required: ex@abc.xyz"
              required
            >
              <input
                className="input100"
                type="text"
                placeholder="Purchase Group"
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div>
                <a href="# " className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* <a href='/MaterialOverview'> */}
            <Link to="/MaterialOverview">
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>
            </Link>
            {/* </a>  */}

            {/* <div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							or sign up using
						</span>
					</div> */}

            <div className="login100-form-social flex-c-m">
              {/* <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
							<i className="fa fa-facebook-f" aria-hidden="true"></i>
						</a> */}

              {/* <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
							<i className="fa fa-twitter" aria-hidden="true"></i>
						</a> */}
            </div>
          </div>

          <div className="login100-more"></div>
        </div>
      </div>
    </div>
  );
};

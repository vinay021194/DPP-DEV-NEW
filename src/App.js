import React, { useState, useRef } from "react";
import classNames from "classnames";
import { Route, Router, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./components/AppTopbar";
import { AppMenu } from "./components/AppMenu";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

import {MaterialOverview} from "./components/MaterialOverview";
import {Materialdatachart} from "./components/Materialdatachart";
import {CostDriversAnalysis} from "./components/CostDriversAnalysis";
import { LoginPage } from "./components/LoginPage";
import { Orderingplant } from "./components/Orderingplant";
import { Inventory } from "./components/Inventory"
import { SupplierAnalysis } from "./components/SupplierAnalysis";

const App = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  // const sidebar = useRef();
  // const history = useHistory();
  // let menuClick = false;

  // const wrapperClass = classNames("layout-wrapper", {
  //   "layout-overlay": layoutMode === "overlay",
  //   "layout-static": layoutMode === "static",
  //   "layout-static-sidebar-inactive":
  //     staticMenuInactive && layoutMode === "static",
  //   "layout-overlay-sidebar-active":
  //     overlayMenuActive && layoutMode === "overlay",
  //   "layout-mobile-sidebar-active": mobileMenuActive,
  //   // "p-input-filled": inputStyle === "filled",
  //   // "p-ripple-disabled": ripple === false,
  // });

  // const sidebarClassName = classNames("layout-sidebar", {
  //   "layout-sidebar-dark": layoutColorMode === "dark",
  //   "layout-sidebar-light": layoutColorMode === "light",
  // });

  // const logo =
  //   layoutColorMode === "dark"
  //     ? "assets/layout/images/logo-white.svg"
  //     : "assets/layout/images/logo.svg";

  // const isDesktop = () => {
  //   return window.innerWidth > 1024;
  // };

  // const onToggleMenu = (event) => {
  //   menuClick = true;

  //   if (isDesktop()) {
  //     if (layoutMode === "overlay") {
  //       setOverlayMenuActive((prevState) => !prevState);
  //     } else if (layoutMode === "static") {
  //       setStaticMenuInactive((prevState) => !prevState);
  //     }
  //   } else {
  //     setMobileMenuActive((prevState) => !prevState);
  //   }
  //   event.preventDefault();
  // };

  // const onWrapperClick = (event) => {
  //   if (!menuClick) {
  //     setOverlayMenuActive(false);
  //     setMobileMenuActive(false);
  //   }
  //   menuClick = false;
  // };

  // const onSidebarClick = () => {
  //   menuClick = true;
  // };

  // const isSidebarVisible = () => {
  //   if (isDesktop()) {
  //     if (layoutMode === "static") return !staticMenuInactive;
  //     else if (layoutMode === "overlay") return overlayMenuActive;
  //     else return true;
  //   }

  //   return true;
  // };

  return (
    <div >
      {/* <AppTopbar onToggleMenu={onToggleMenu} /> */}

      {/* <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={isSidebarVisible()}
        unmountOnExit
      >
        <div
          ref={sidebar}
          className={sidebarClassName}
          onClick={onSidebarClick}
        >
          <div
            className="layout-logo"
            style={{
              cursor: "pointer",
            }}
            onClick={() => history.push("/")}
          >
            <img
              alt="Logo"
              src={logo}
              style={{
                width: "200px",
                margin: "0px 0px 15px 0px",
              }}
            />
          </div>
          <AppMenu/>
        </div>
      </CSSTransition> */}

      {/* <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} /> */}

      <div className="">
        {/* <Router > */}
        <Route path="/" exact component={MaterialOverview} />
        <Route path="/Materialdatachart" exact component={Materialdatachart} />
        <Route path="/CostDriversAnalysis" exact component={CostDriversAnalysis} />
        <Route path="/LoginPage" exact component={LoginPage} />
        <Route path="/Orderingplant" exact component={Orderingplant} />
        <Route path="/Inventory" exact component={Inventory} />
        <Route path="/SupplierAnalysis" exact component={SupplierAnalysis} />
        
        
        {/* </Router> */}

      </div>
      

    </div>
  );
};

export default App;

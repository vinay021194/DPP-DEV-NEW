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

import { MaterialOverview } from "./components/MaterialOverview";
import { Materialdatachart } from "./components/Materialdatachart";
import { CostDriversAnalysis } from "./components/CostDriversAnalysis";
import { MostInfluencialAnalysis } from "./components/MostInfluencialAnalysis";
import { LoginPage } from "./components/LoginPage";
import { Orderingplant } from "./components/Orderingplant";
import { Inventory } from "./components/Inventory";
import { SupplierAnalysis } from "./components/SupplierAnalysis";

const App = (props) => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  // console.log("App props===>", window.location);
  let menuClick = false;

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  const onToggleMenu = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        setOverlayMenuActive((prevState) => !prevState);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }
    event.preventDefault();
  };

  return (
    <div>
      <div className="">
        <Route path="/" exact component={LoginPage} />
        {/* <AppTopbar onToggleMenu={onToggleMenu} {...props} /> */}

        <Route path="/" render={(props) => <AppTopbar onToggleMenu={onToggleMenu} {...props} />} />
        <Route path="/MaterialOverview" exact render={(props) => <MaterialOverview {...props} />} />
        <Route path="/Materialdatachart" exact render={(props) => <Materialdatachart {...props} />} />
        <Route path="/CostDriversAnalysis" exact render={(props) => <CostDriversAnalysis {...props} />} />
        <Route path="/MostInfluencialAnalysis" exact render={(props) => <MostInfluencialAnalysis {...props} />} />
        <Route path="/Orderingplant" exact render={(props) => <Orderingplant {...props} />} />
        <Route path="/Inventory" exact render={(props) => <Inventory {...props} />} />
        <Route path="/SupplierAnalysis" exact render={(props) => <SupplierAnalysis {...props} />} />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AppTopbar } from "./components/AppTopbar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
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
import DemandPrediction from "./components/DemandPrediction";
import Home from "./components/Home";

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
    <Switch>
      <Route path="/" exact render={(props) => <Home onToggleMenu={onToggleMenu} {...props} />} />
      <Route path="/login" exact component={LoginPage} />
      <div>
        <Route path="/" render={(props) => <AppTopbar onToggleMenu={onToggleMenu} {...props} />} />
        <Route path="/orderOptimization/MaterialOverview" exact render={(props) => <MaterialOverview {...props} />} />
        <Route path="/orderOptimization/Materialdatachart" exact render={(props) => <Materialdatachart {...props} />} />
        <Route
          path="/orderOptimization/CostDriversAnalysis"
          exact
          render={(props) => <CostDriversAnalysis {...props} />}
        />
        <Route path="/orderOptimization/Orderingplant" exact render={(props) => <Orderingplant {...props} />} />
        <Route path="/orderOptimization/Inventory" exact render={(props) => <Inventory {...props} />} />
        <Route path="/orderOptimization/SupplierAnalysis" exact render={(props) => <SupplierAnalysis {...props} />} />
        <Route path="/demandPrediction" exact render={(props) => <DemandPrediction {...props} />} />
        <Route path="/costDriversAnalysis" exact render={(props) => <MostInfluencialAnalysis {...props} />} />
      </div>
    </Switch>
  );
};

export default App;

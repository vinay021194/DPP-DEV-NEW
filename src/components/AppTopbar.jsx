import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useEffect } from "react";
import {items} from "../appConstant"
import {menuItems} from "../appConstant"
export const AppTopbar = (props) => {
  // console.log("AppTopBar props===>", props);
  const [activeMenu, setActiveMenu] = useState(props?.location?.pathname);

  useEffect(() => setActiveMenu(props?.location?.pathname), [props]);

  const activeClass = "p-button-text mx-3 active-route";

  const handleActiveMenu = (e, label) => {
    // console.log("handleActiveMenu===>", label);
    setActiveMenu(label);
  };

  const start = (
    <div style={{ display: "flex" }}>
      <Link to="/MaterialOverview">
        <img src="assets/layout/images/logo-white.svg" height="40" title="SSA" />
      </Link>
      <div className="p-ml-5">
        {menuItems.map((item) => (
          <Link to={item.to} key={item.label}>
            <Button
              label={item.label}
              className={activeMenu === item.to ? activeClass : "p-button-text p-button-secondary mx-3"}
              onClick={(e) => handleActiveMenu(e, item.to)}
            />
          </Link>
        ))}
      </div>
    </div>
  );

  const end = (
    <SplitButton label="User" icon="pi pi-user" className="p-button-text mr-2 mb-2" model={items}></SplitButton>
  );

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "999",
      }}
    >
      <Menubar start={start} end={end} />
    </div>
  );
};


import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { useEffect } from "react";

export const AppTopbar = (props) => {
  // console.log("AppTopBar props===>", props);
  const [activeMenu, setActiveMenu] = useState(props?.location?.pathname);

  useEffect(() => setActiveMenu(props?.location?.pathname), [props]);

  const items = [
    {
      index: 1,
      label: "Profile",
      icon: "pi pi-user",
    },

    {
      index: 2,
      label: "Add User",
      icon: "pi pi-user-plus",
    },

    {
      index: 3,
      label: "Edit User",
      icon: "pi pi-user-edit",
    },
    {
      index: 4,
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        window.location = "/";
      },
    },
  ];

  const menuItems = [
    { label: "Material Overview", icon: "pi pi-fw pi-home", to: "/MaterialOverview" },
    { label: "Demand Prediction", icon: "pi pi-fw pi-pencil", to: "/Materialdatachart" },
    { label: "Cost Drivers Analysis", icon: "pi pi-fw pi-calendar", to: "/CostDriversAnalysis" },
    { label: "Supplier Analysis", icon: "pi pi-fw pi-calendar", to: "/SupplierAnalysis" },
  ];

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


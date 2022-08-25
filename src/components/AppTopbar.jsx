import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { useEffect } from "react";

export const AppTopbar = (props) => {
  const [activeMenu, setActiveMenu] = useState(props?.location?.pathname);
  const [activeMenuItems, setActiveMenuItems] = useState([]);

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
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        props.history.push("/");
      },
    },
    {
      index: 5,
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        props.history.push("/login");
      },
    },
  ];

  let menuItems = [
    {
      label: "Order Optimization",
      // command: () => {
      //   console.log("AppTopbar props===>", props);
      //   props.history.push("/orderOptimization/MaterialOverview");
      // },
      // icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Material Overview",
          // icon: "pi pi-fw pi-home",
          to: "/MaterialOverview",
          command: () => {
            console.log("AppTopbar props===>", props);
            props.history.push("/orderOptimization/MaterialOverview");
          },
        },
        {
          label: "Demand Prediction",
          // icon: "pi pi-fw pi-chart-line",
          to: "/Materialdatachart",
          command: () => {
            props.history.push("/orderOptimization/Materialdatachart");
          },
        },
        {
          label: "Cost Drivers Analysis",
          // icon: "pi pi-fw pi-calendar",
          to: "/CostDriversAnalysis",
          command: () => {
            props.history.push("/orderOptimization/CostDriversAnalysis");
          },
        },
        {
          label: "Supplier Analysis",
          // icon: "pi pi-fw pi-calendar",
          to: "/SupplierAnalysis",
          command: () => {
            props.history.push("/orderOptimization/SupplierAnalysis");
          },
        },
      ],
    },
    {
      label: "Demand Prediction",
      // icon: "pi pi-fw pi-chart-line",
      to: "/demandPrediction",
      command: () => {
        props.history.push("/demandPrediction");
      },
    },
    {
      label: "Cost Drivers Analysis",
      // icon: "pi pi-fw pi-calendar",
      to: "/CostDriversAnalysis",
      command: () => {
        props.history.push("/costDriversAnalysis");
      },
    },
  ];

  // let menuItems = [
  //   { label: "Material Overview", icon: "pi pi-fw pi-home", to: "/MaterialOverview" },
  //   // { label: "Demand Prediction", icon: "pi pi-fw pi-chart-line", to: "/Materialdatachart" },
  //   // { label: "Cost Drivers Analysis", icon: "pi pi-fw pi-calendar", to: "/CostDriversAnalysis" },
  //   // { label: "Supplier Analysis", icon: "pi pi-fw pi-calendar", to: "/SupplierAnalysis" },
  // ];

  const activeClass = "p-button-text mx-3 active-route";

  useEffect(() => {
    setActiveMenu(props?.location?.pathname);
    // setTimeout(() => {
    //   const selectedPlant = localStorage.getItem("plant");
    //   if (selectedPlant) {
    //     menuItems = [
    //       { label: "Material Overview", icon: "pi pi-fw pi-home", to: "/MaterialOverview" },
    //       { label: "Demand Prediction", icon: "pi pi-fw pi-chart-line", to: "/Materialdatachart" },
    //       { label: "Cost Drivers Analysis", icon: "pi pi-fw pi-calendar", to: "/CostDriversAnalysis" },
    //       { label: "Supplier Analysis", icon: "pi pi-fw pi-calendar", to: "/SupplierAnalysis" },
    //     ];
    //     setActiveMenuItems(menuItems);
    //   } else {
    //     menuItems = [{ label: "Material Overview", icon: "pi pi-fw pi-home", to: "/MaterialOverview" }];
    //     setActiveMenuItems(menuItems);
    //   }
    // }, 100);
  }, [props]);

  const handleActiveMenu = (e, label) => {
    // console.log("handleActiveMenu===>", label);
    setActiveMenu(label);
  };

  const start = (
    <div style={{ display: "flex" }} className="p-mr-5">
      <Link to="/">
        <img src="/assets/layout/images/logo-white.svg" height="40" title="SSA" />
      </Link>
      {/* <div className="p-ml-5">
        {menuItems?.map((item) => (
          <Link to={item.to} key={item.label}>
            <Button
              label={item.label}
              className={activeMenu === item.to ? activeClass : "p-button-text p-button-secondary mx-3"}
              onClick={(e) => handleActiveMenu(e, item.to)}
            />
          </Link>
        ))}
      </div> */}
    </div>
  );

  const end = (
    <>
      <Link to="/">
        <Button label="Home" icon="pi pi-home" className="p-button-text mr-2 mb-2" />
      </Link>
      <SplitButton label="User" icon="pi pi-user" className="p-button-text mr-2 mb-2" model={items}></SplitButton>
    </>
  );

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "999",
      }}
    >
      {/* <Menubar model={menuItems} start={start} end={end} /> */}
      <Menubar start={start} end={end} />
    </div>
  );
};

import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Link } from "react-router-dom";

export const AppTopbar = (props) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const items = [
    {
      label: "Profile",
      icon: "pi pi-user",
    },

    {
      label: "Add User",
      icon: "pi pi-user-plus",
    },
    { label: "Edit User", icon: "pi pi-user-edit" },

    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        window.location = "/";
      },
    },
  ];
  const items2 = [
    { label: "Home", icon: "pi pi-fw pi-home" },
    { label: "Calendar", icon: "pi pi-fw pi-calendar" },
    { label: "Edit", icon: "pi pi-fw pi-pencil" },
  ];

  return (
    <div className="layout-topbar clearfix">
      {/* <button
        type="button"
        className="p-link layout-menu-button"
        onClick={props.onToggleMenu}
      >
        <span className="pi pi-bars" />
      </button> */}
      <Link to="/MaterialOverview">
        <img src="assets/layout/images/logo-white.svg" style={{ height: "100%", width: "auto" }} title="SSA" />
      </Link>

      {/* <TabMenu model={items2} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} /> */}

      {/* <a className="navbar-brand"

       href="#"
        style={{padding:"4px;margin:auto"}}
        >
          <img src="assets/layout/images/logo-white.svg"
          style={{height:"100%", width: "auto" }}
<<<<<<< HEAD
           title="SSA"/></a> */}

      <div className="layout-topbar-icons">
        {/* <span className="layout-topbar-search">
          <InputText type="text" placeholder="Search" />
          <span className="layout-topbar-search-icon pi pi-search" />
        </span>
        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">Events</span>
          <span className="layout-topbar-icon pi pi-calendar" />
          <span className="layout-topbar-badge">5</span>
        </button>
        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">Settings</span>
          <span className="layout-topbar-icon pi pi-cog" />
        </button> */}
        {/* <button type="button" className="p-link">
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
        </button> */}
        <SplitButton label="User" icon="pi pi-user" className="p-button-text mr-2 mb-2" model={items}></SplitButton>
      </div>
    </div>
  );
};

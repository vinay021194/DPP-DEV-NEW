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
  // const items2 = [
  //   { label: "Home", icon: "pi pi-fw pi-home" },
  //   { label: "Calendar", icon: "pi pi-fw pi-calendar" },
  //   { label: "Edit", icon: "pi pi-fw pi-pencil" },
  // ];

  return (
    <div className="layout-topbar clearfix">
      <Link to="/MaterialOverview">
        <img src="assets/layout/images/logo-white.svg" style={{ height: "100%", width: "auto" }} title="SSA" />
      </Link>

      <div className="layout-topbar-icons">
        <SplitButton label="User" icon="pi pi-user" className="p-button-text mr-2 mb-2" model={items}></SplitButton>
      </div>
    </div>
  );
};

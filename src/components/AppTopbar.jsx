//import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
//import { useEffect } from "react";
import { items } from "../appConstant";
export const AppTopbar = (props) => {
//  const [activeMenu, setActiveMenu] = useState(props?.location?.pathname);

  // useEffect(() => {
  //   setActiveMenu(props?.location?.pathname);
  // }, [props]);

  // const handleActiveMenu = (e, label) => {
  //   setActiveMenu(label);
  // };

  const start = (
    <div style={{ display: "flex" }} className="p-mr-5">
      <Link to="/">
        <img
          src="/assets/layout/images/logo-white.svg"
          height="40"
          title="SSA"
        />
      </Link>
    </div>
  );

  const end = (
    <>
      <Link to="/">
        <Button
          label="Home"
          icon="pi pi-home"
          className="p-button-text mr-2 mb-2"
        />
      </Link>
      <SplitButton
        label="User"
        icon="pi pi-user"
        className="p-button-text mr-2 mb-2"
        model={items}
      ></SplitButton>
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
      <Menubar start={start} end={end} />
    </div>
  );
};

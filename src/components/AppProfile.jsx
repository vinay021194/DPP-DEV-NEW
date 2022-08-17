import React, { useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export const AppProfile = (props) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = (event) => {
    setExpanded((prevState) => !prevState);
    event.preventDefault();
  };

  return (
    <div className="layout-profile">
      <div>
        <img src="assets/layout/images/profile.png" alt="Profile" />
      </div>
      <button className="p-link layout-profile-link" onClick={onClick}>
        <span className="username">Claire Williams</span>
        <i className="pi pi-fw pi-cog" />
      </button>
      <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={expanded} unmountOnExit>
        <ul className={classNames({ "layout-profile-expanded": expanded })}>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Account</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-fw pi-inbox" />
              <span>Notifications</span>
              <span className="menuitem-badge">2</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-fw pi-power-off" />
              <span>Logout</span>
            </button>
          </li>
          {/* <button type="button" className="p-link">
            <i className="pi pi-fw pi-power-off" />
            <Link to="/">
              <span>Logout</span>
            </Link>
          </button> */}
          <Link to="/SupplierAnalysis">
            <Button className="nextbutton" label="Supplier Analysis" style={{ marginLeft: " 15px" }} />
          </Link>
          {/* <Button className="pi pi-fw pi-power-off" label="Logout " /> */}
        </ul>
      </CSSTransition>
    </div>
  );
};

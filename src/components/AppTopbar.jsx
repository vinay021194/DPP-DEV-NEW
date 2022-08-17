import React from "react";
import { InputText } from "primereact/inputtext";
import{SplitButton} from 'primereact/splitbutton'
import { Toast } from 'primereact/toast';


export const AppTopbar = (props) => {
  const items = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
       
    },
   
    {
        label: 'Add User',
        icon: 'pi pi-user-plus',
     
    },
    {   label: 'Edit User',
        icon: 'pi pi-user-edit',
      
    },
   
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
  
  },
]

  return (
    <div className="layout-topbar clearfix">
      {/* <button
        type="button"
        className="p-link layout-menu-button"
        onClick={props.onToggleMenu}
      >
        <span className="pi pi-bars" />
      </button> */}
      <a className="navbar-brand"
       href="#"
        style={{padding:"4px;margin:auto"}}
        >
          <img src="assets/layout/images/logo-white.svg"
          style={{height:"100%", width: "auto" }}
           title="SSA"/></a>
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
         <SplitButton label="User" icon="pi pi-user"className="p-button-text mr-2 mb-2" model={items}></SplitButton>
      </div>
    </div>
  );
};

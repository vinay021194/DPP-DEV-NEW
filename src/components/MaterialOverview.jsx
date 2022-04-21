
import React, { useState, useEffect, useRef } from 'react';
import classNames from "classnames";
import { DataTable } from 'primereact/datatable';
import {  useHistory } from "react-router-dom";
import { Column } from 'primereact/column';
import { ProductService } from '../services/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import './App.css';
import { AppMenu } from "../components/AppMenu";
import { AppTopbar } from "../components/AppTopbar";
import { CSSTransition } from "react-transition-group";
import{Inventory} from "../components/Inventory"

 export const MaterialOverview = () => {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    //const toast = useRef(null);
    const isMounted = useRef(false);
    const productService = new ProductService();

  
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
    let menuClick = false;

    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
            //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        }
    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;
       // productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        productService.getMaterialInfo().then(data =>setProducts(data));

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        //toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    }

    const onRowCollapse = (event) => {
       // toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    }

    // const expandAll = () => {
    //     let _expandedRows = {};
    //     products.forEach(p => _expandedRows[`${p.id}`] = true);

    //     setExpandedRows(_expandedRows);
    // }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const amountBodyTemplate = (rowData) => {
        return  <Chip label="Sufficient for the next 2 month" style={{backgroundColor:'#feca57'}} />
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order`}>50T</span>;
    }

    const searchBodyTemplate = () => {
        return  <Button icon="pi pi-check" className="p-button-rounded p-button-success p-button-outlined" />;
    }

    const imageBodyTemplate = (rowData) => {
        return <span className={`product-badge status`}>7001733</span>;
    }

    const priceBodyTemplate = (rowData) => {
        return <Chip label="Urgent" style={{backgroundColor:'#ff6b6b'}} />
        ;
    }

    const ratingBodyTemplate = (rowData) => {
        return <span className={`product-badge status`}>Alim</span>
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status`}>Gasket</span>;
    }

   
    const onSidebarClick = () => {
        menuClick = true;
      };
    
      const isSidebarVisible = () => {
        if (isDesktop()) {
          if (layoutMode === "static") return !staticMenuInactive;
          else if (layoutMode === "overlay") return overlayMenuActive;
          else return true;
        }
    
        return true;
      };
      const isDesktop = () => {
        return window.innerWidth > 1024;
      };
      const sidebarClassName = classNames("layout-sidebar", {
        "layout-sidebar-dark": layoutColorMode === "dark",
        "layout-sidebar-light": layoutColorMode === "light",
      });
     const sidebar = useRef();
     const history = useHistory();
     const logo =
      layoutColorMode === "dark"
      ? "assets/layout/images/logo-white.svg"
      : "assets/layout/images/logo.svg";

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive":
          staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active":
          overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        // "p-input-filled": inputStyle === "filled",
        // "p-ripple-disabled": ripple === false,
      });
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
      const onWrapperClick = (event) => {
        if (!menuClick) {
          setOverlayMenuActive(false);
          setMobileMenuActive(false);
        }
        menuClick = false;
      };


    const header = (
        <div className="table-header-container">
           <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Material Overview</h5>
        </div>
    );
    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                {/* <h5>Orders for {data.name}</h5> */}
                <DataTable value={data.orders} responsiveLayout="scroll">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Name" sortable  body={statusBodyTemplate}></Column>
                    <Column field="inventory" header="Inventory" sortable  body={statusOrderBodyTemplate}></Column>
                    <Column field="status" header="Status" body={amountBodyTemplate} sortable></Column>
                    <Column field="" header=""></Column>
                    <Column field="focus" header="Focus"  sortable></Column>
                    
                </DataTable>
            </div>
        );
    }
    
    console.log(products)

    return ( 
        <div className={wrapperClass} onClick={onWrapperClick}>
             <AppTopbar onToggleMenu={onToggleMenu} />
            {/* <Toast ref={toast} /> */}
            <div className='layout-main'>
                  
            <div className="card">
              
                <DataTable value={products.Sheet2} expandedRows={expandedRows}
                 onRowToggle={(e) => setExpandedRows(e.data)}
               
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="id" header={header}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="material" header="material"  sortable></Column>
                    <Column field="material_description_1" header="material_description_1" sortable></Column>
                    {/* <Column field="inventory" header="Inventory" sortable body={statusOrderBodyTemplate}></Column> */}
                    <Column field="status_level_material" header="status_level_material" sortable  />
                    {/* <Column field="Focus" header="Focus" sortable body={searchBodyTemplate} />
                    <Column field="tag" header="Tag" sortable body={ratingBodyTemplate} /> */}
                   
                </DataTable>
            </div>
            <a href='Materialdatachart'>
            <Button
              label="Demand Prediction "
              style={{ margin: "3px 15px"  }}
            />
            </a>
            </div>
               <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={isSidebarVisible()}
        unmountOnExit
      >
        <div
          ref={sidebar}
          className={sidebarClassName}
          onClick={onSidebarClick}
        >
          <div
            className="layout-logo"
            style={{
              cursor: "pointer",
            }}
            onClick={() => history.push("/")}
          >
            <img
              alt="Logo"
              src={logo}
              style={{
                width: "200px",
                margin: "0px 0px 15px 0px",
              }}
            />
          </div>
          <AppMenu/>
        </div>
              </CSSTransition>
        </div>
       
       
    );
}
                 

import React, { useState, useEffect, useRef } from 'react';
import classNames from "classnames";
import { DataTable } from 'primereact/datatable';
import {  useHistory } from "react-router-dom";
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar'
import { ProductService } from '../services/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './App.css';
import { AppMenu } from "./AppMenu";
import { AppTopbar } from "./AppTopbar";
import { CSSTransition } from "react-transition-group";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Chip } from 'primereact/chip';
import plantJsonData from "../data/plantData.json"
import supplierJsonData from "../data/supplierData.json"


 export const Orderingplant = () => {
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
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [supplierData, setsupplierData] = useState(null);
  const [plantData, setplantData] = useState(null);

 console.log("plantJsonData===>",plantJsonData)
 console.log("supplierJsonData===>",supplierJsonData)

    let menuClick = false;
    
    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
            //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        }
    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;
        productService.getMaterialInfo().then(data => setProducts(data));
        setsupplierData(supplierJsonData.Sheet1)
        setplantData(plantJsonData.Sheet1)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        //toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    }

    const onRowCollapse = (event) => {
       // toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    }

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => _expandedRows[`${p.id}`] = true);

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    const searchBodyTemplate = () => {
        return  <Button icon="pi pi-check" className="p-button-rounded p-button-outlined" />;
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }

   

    const ratingBodyTemplate = (rowData) => {
        return  <Chip label="6% less then  the minimum" style={{backgroundColor:'#feca57'}} />
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
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
           <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Buyer Group - 07J, Material - 949555 information</h5>
        </div>
    );
    const header2 = (
      <div className="table-header-container">
         <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Ordering Schedule Plant(Tons)</h5>
      </div>
  );

    return ( 
        <div >
             <AppTopbar onToggleMenu={onToggleMenu} />
            {/* <Toast ref={toast} /> */}
          <div className='layout-main'>
          <div className="card">
                <DataTable 
                value={products.Sheet2}
                //  expandedRows={expandedRows} 
                // onRowToggle={(e) => setExpandedRows(e.data)}
                //     onRowExpand={onRowExpand} 
                //     onRowCollapse={onRowCollapse} 
                    responsiveLayout="scroll"
                   // rowExpansionTemplate={rowExpansionTemplate}
                     dataKey="id" header={"Material Information"}   
                        rows={1}>
                   
                   <Column field="material" header="ID" sortable></Column>
                    {/* <Column field="Discription" header="Discription" sortable ></Column> */}
                    <Column field="base_unit_of_measure (UOM)" header="UOM" sortable ></Column>
                    <Column field="aliases" header="Aliases" sortable/>
                    {/* <Column field="Criticality" header="Criticality" sortable  /> */}
                    <Column field="material_type (SAP)" header="SAP" sortable  />
                    <Column field="material_group (organisation)" header="Organisation" sortable />
                    <Column field="mdrm_class (class)" header="Class"  />
                </DataTable>
            </div>
            <div className='card'>
           <DataTable 
                   value={supplierData} 
                  //  expandedRows={expandedRows}
                    // onRowToggle={(e) => setExpandedRows(e.data)}
                    // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    // rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    header={header2}
                    rows={1}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="Plant" header="Plant"  ></Column>
                    <Column field="Supplier" header="Supplier Name"  ></Column>
                    <Column field="June" header="Feb22"  />
                    <Column field="July" header="Mar22"  />
                    <Column field="August" header="Apr22" />
                    <Column field="September" header="May22"  />
                    <Column field="October" header="Jun22"   />
                    <Column field="November" header="July22"  />
                    <Column field="Total Quantity" header="Total Quantities From Supplier"   />
                   
                </DataTable>
                </div>
                <div className='card'>
               
           <DataTable 
                   value={plantData} 
                  //  expandedRows={expandedRows}
                  //   onRowToggle={(e) => setExpandedRows(e.data)}
                  //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                  //   rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    //header={header3}
                    rows={5}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="Plant" header="Plant"  ></Column>
                    <Column field="undefined" header="Name"  ></Column>
                    <Column field="June" header="Feb22"  />
                    <Column field="July" header="Mar22"  />
                    <Column field="August" header="Apr22" />
                    <Column field="September" header="May22"  />
                    <Column field="October" header="Jun22"   />
                    <Column field="November" header="July22"  />
                    
                </DataTable>
                </div>
            </div>
                {/* <CSSTransition
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
                </CSSTransition> */}
                 <div style={{ display:'flex',justifyContent:'center' }}>
                  <a href='Inventory'>
            <Button
              label="Previous "
              style={{ margin: "3px 15px"  }}
            />
            </a>
            </div>
        </div>
       
       
    );
}
                 
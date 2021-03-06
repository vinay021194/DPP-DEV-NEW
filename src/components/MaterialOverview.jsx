import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Link, useHistory } from "react-router-dom";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import { AppMenu } from "../components/AppMenu";
import { AppTopbar } from "../components/AppTopbar";
import { CSSTransition } from "react-transition-group";
// import { Dropdown } from "primereact/dropdown";
// import { Redirect } from "react-router-dom";

export const MaterialOverview = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setproductsFiltered] = useState([]);

  const [expandedRows, setExpandedRows] = useState(null);
  //const toast = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  let menuClick = false;

  const rowAccessories = {
    background: "#f3f3f3",
    opacity: "1",
  };

  useEffect(() => {
    if (isMounted.current) {
      //const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
      //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
    }
  }, [expandedRows]);

  useEffect(() => {
    isMounted.current = true;
    // productService.getProductsWithOrdersSmall().then(data => setProducts(data));
    productService.getMaterialInfo().then((data) => {
      return setProducts(data);
    });
    productService.getMaterialInfo().then((data) => {
      return setproductsFiltered(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <h5
        style={{
          fontWeight: "bolder",
          fontFamily: "Poppins",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Material Overview
      </h5>
    </div>
  );

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span
        className={`productsss-badge status-${rowData.status_level_plant.toLowerCase()}`}
      >
        {rowData.status_level_plant}
      </span>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`productss-badge status-${rowData.status_level_material.toLowerCase()}`}
      >
        {rowData.status_level_material}
      </span>
    );
  };

  const next = () => {
    props.history.push("/Materialdatachart", {
      selectedPlant: selectedPlant,
    });
  };

  const rowClass = (data) => {
    return {
      "row-accessories": true,
    };
  };

  const handlePlantSelect = (e) => {
    console.log("handlePlantSelect==>", e, selectedPlant);
    setSelectedPlant(e.value);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={data.expend}
          responsiveLayout="scroll"
          selection={
            selectedPlant &&
            selectedPlant.filter((ele) => ele.material === "768971")
          }
          onSelectionChange={(e) => handlePlantSelect(e)}
          dataKey="Key"
          rowClassName={rowClass}
          className="row-p-datatable .p-datatable-thead > tr > th"
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate=" {first} to {last} of {totalRecords}"
          selectionMode="multiple"
        >
          <Column
            selectionMode="multiple"
            field="material"
            dataKey="material"
          />
          <Column field="plant" header="Plant ID" />
          <Column field="plant_name" header="Plant Name" />
          <Column
            field="status_level_plant"
            header="Status"
            body={statusOrderBodyTemplate}
          />
        </DataTable>
      </div>
    );
  };

  const handlefilter = (filters, types) => {
    if (types === "Multiselect") {
      if (filters.length > 0) {
        let allMaterial = filters.map((d) => d.name);
        if (filters) {
          let filteredData = products.filter((data) => {
            //console.log("data====>",data)
            return allMaterial.includes(data.material);
          });
          setproductsFiltered(filteredData);
        }
      } else {
        setproductsFiltered(products);
      }
    } else {
      if (filters.length > 0) {
        let filteredData = products.filter((data) => {
          //console.log("data====>",data)
          return filters.includes(data.status_level_material);
        });
        // console.log("filteredData===>", filteredData);
        setproductsFiltered(filteredData);
      } else {
        setproductsFiltered(products);
      }
    }
  };
  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar onToggleMenu={onToggleMenu} />
      <div className="layout-main">
        <div className="card">
          <DataTable
            value={productsFiltered}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="material"
            header={header}
            className="rows-p-datatable .p-datatable-thead > tr > th"
            // rowClassName={rowClass}
            //paginator
            rows={10}
            // rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate=" {first} to {last} of {totalRecords}"
            //Disabled={rowData.material !=='700047'}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              field="material"
              header="ID"
              //Disabled={'material' !=='700047'}
            ></Column>
            <Column field="material_description_1" header="Name"></Column>
            <Column field="inventory_material_level" header="Inventory" />
            <Column
              field="status_level_material"
              header="Status"
              body={statusBodyTemplate}
            />
          </DataTable>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <Link to="/Materialdatachart"> */}
          <Button
            className="nextbutton"
            label="Next "
            style={{ margin: "3px 15px" }}
            onClick={next}
          />
          {/* </Link> */}
        </div>
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
          <AppMenu
            handlefilter={(filters, types) => handlefilter(filters, types)}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

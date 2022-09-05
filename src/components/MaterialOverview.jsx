import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Link, useHistory } from "react-router-dom";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import { AppMenu } from "../components/AppMenu";
import { CSSTransition } from "react-transition-group";

export const MaterialOverview = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setproductsFiltered] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);

  const isMounted = useRef(false);
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  let menuClick = false;

  useEffect(() => {
    delete localStorage.source;
    delete localStorage.CostDriver;
    delete localStorage.costDriverSeries;
    delete localStorage.Material;
    delete localStorage.plant;
    delete localStorage["Material-Plant"];
    delete localStorage.startDate;
    delete localStorage.endDate;
    delete localStorage.suppliers;

    isMounted.current = true;
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

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
  });

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
      <span className={`productsss-badge status-${rowData.status_level_plant.toLowerCase()}`}>
        {rowData.status_level_plant}
      </span>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`productss-badge status-${rowData.status_level_material.toLowerCase()}`}>
        {rowData.status_level_material}
      </span>
    );
  };

  const next = () => {
    props.history.push("/orderOptimization/Materialdatachart", {
      selectedPlant: selectedPlant,
    });
  };

  const rowClass = (data) => {
    return {
      "row-accessories": true,
    };
  };

  const handlePlantSelect = (e) => {
    localStorage.setItem("Material", e.value?.material);
    localStorage.setItem("plant", e.value?.plant);
    localStorage.setItem("Material-Plant", e.value?.Key);
    setSelectedPlant(e.value);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={data.expend}
          responsiveLayout="scroll"
          selection={selectedPlant}
          onSelectionChange={(e) => handlePlantSelect(e)}
          dataKey="Key"
          rowClassName={rowClass}
          style={{ background: "green", fontWeight: "bold" }}
          className=""
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate=" {first} to {last} of {totalRecords}"
          selectionMode="single"
        >
          <Column selectionMode="single" />
          <Column field="plant" header="Plant ID" />
          <Column field="plant_name" header="Plant Name" />
          <Column field="status_level_plant" header="Status" body={statusOrderBodyTemplate} />
        </DataTable>
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    );
  };

  const handlefilter = (filters = [], types) => {
    if (types === "Multiselect") {
      if (filters.length > 0) {
        let filteredData = products.filter((data) => filters.includes(data.material));
        setproductsFiltered(filteredData);
      } else if (filters.length > 0) {
      } else {
        setproductsFiltered(products);
      }
    } else {
      if (filters.length > 0) {
        let filteredData = products.filter((data) => filters.includes(data.status_level_material));
        setproductsFiltered(filteredData);
      } else {
        setproductsFiltered(products);
      }
    }
    if (types === "singleselect") {
      if (filters.length > 0) {
        let filteredData = products.filter((data) => filters.includes(data.plant));
        setproductsFiltered(filteredData);
      } else {
        setproductsFiltered(products);
      }
    }
  };

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <div className="layout-main">
        <div className="card">
          <DataTable
            value={productsFiltered}
            expandedRows={displayBasic}
            onRowToggle={(e) => setDisplayBasic(e.data)}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="material"
            header={header}
            className="rows-p-datatable .p-datatable-thead > tr > th"
            rows={5}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLrowink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate=" {first} to {last} of {totalRecords}"
            selectionPageOnly
            paginator
            selectionMode="single"
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="material" header="ID"></Column>
            <Column field="material_description_1" header="Name"></Column>
            <Column field="inventory_material_level" header=" Total Inventory (T)" />
            <Column field="status_level_material" header="Status" body={statusBodyTemplate} />
          </DataTable>
        </div>
        <Button
          className="nextbutton"
          label="Next "
          style={{
            marginLeft: "460px",
            display: "flex",
            justifyContent: "center",
          }}
          disabled={selectedPlant ? false : true}
          onClick={next}
        />
      </div>
      <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={isSidebarVisible()}
        unmountOnExit
      >
        <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
          <AppMenu handlefilter={(filters, types) => handlefilter(filters, types)} />
        </div>
      </CSSTransition>
    </div>
  );
};

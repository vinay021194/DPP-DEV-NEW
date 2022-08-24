import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import { AppTopbar } from "./AppTopbar";
import plantJsonData from "../data/plantData.json";
import supplierJsonData from "../data/supplierData.json";
import { Link } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";

export const Orderingplant = () => {
  const [products, setProducts] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  //const toast = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();

  const [layoutMode, setLayoutMode] = useState("static");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [supplierData, setsupplierData] = useState(null);
  const [plantData, setplantData] = useState(null);
  const [selectedCities1, setSelectedCities1] = useState(null);
  const onPlantChange = (e) => {
    setSelectedCities1(e.value);
  };
  const city = [{ name: "2000", code: "2000" }];

  let currenYyear = new Date().getFullYear() * 1;
  let currenMonth = new Date().getMonth() * 1;

  const dateMaker = (yr, mnt) => {
    const date = new Date(yr, mnt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    return date;
  };

  let menuClick = false;

  useEffect(() => {
    // console.log("window.supplierObject===>", window.supplierObject);
    if (isMounted.current) {
      const summary = expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
    }
    window.supplierObject2 = window.supplierObject;
  }, [expandedRows]);
  useEffect(() => {
    isMounted.current = true;
    // productService.getMaterial().then((data) => setProducts3(data));

    productService.getMaterial().then((data) => {
      let materilaData = data.Sheet3.filter((data) => data.material === localStorage.getItem("Material"));
      console.log("Material info: " + materilaData);
      // setProducts(materilaData)
      setProducts3(materilaData);
    });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getMaterialInfo().then((data) => setProducts(data));
    setsupplierData(supplierJsonData.Sheet1);
    setplantData(plantJsonData.data.Sheet1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const expandAll = () => {
  //   let _expandedRows = {};
  //   products.forEach((p) => (_expandedRows[`${p.id}`] = true));

  //   setExpandedRows(_expandedRows);
  // };

  // const collapseAll = () => {
  //   setExpandedRows(null);
  // };

  // const formatCurrency = (value) => {
  //   return value.toLocaleString("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  // };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

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

  const header = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Material</h5>
    </div>
  );
  const header2 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Ordering Schedule</h5>
      <h10 style={{ fontWeight: "lighter", fontFamily: "Poppins" }}>All values are in Tonnes</h10>
    </div>
  );

  return (
    <div>
      {/* <AppTopbar onToggleMenu={onToggleMenu} /> */}
      {/* <Toast ref={toast} /> */}
      <div className="layout-main">
        <h5
          style={{
            fontWeight: "bolder",
            fontFamily: "poppins",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Ordering Schedule
        </h5>
        <div className="card">
          <DataTable
            value={products3}
            //  expandedRows={expandedRows}
            // onRowToggle={(e) => setExpandedRows(e.data)}
            //     onRowExpand={onRowExpand}
            //     onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            // rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header}
            rows={1}
          >
            <Column field="material" header="ID"></Column>
            {/* <Column field="" header="Buyer-Group" ></Column> */}
            <Column field="material_type (SAP)" header="Type" />
            <Column field="material_description_1" header="Description"></Column>

            <Column field="base_unit_of_measure (UOM)" header="UOM"></Column>
            <Column field="mdrm_class (class)" header="UNSPSC Description" />
          </DataTable>
        </div>
        <MultiSelect
          className=""
          style={{
            width: "30%",
            margin: "5px 10px",
            display: "flex",
            justifyContent: "center",
          }}
          value={selectedCities1}
          options={city}
          onChange={onPlantChange}
          optionLabel="name"
          placeholder="2000"
          display="chip"
        />
        <div className="card">
          <DataTable
            value={supplierData}
            //  expandedRows={expandedRows}
            // onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
            // rowExpansionTemplate={rowExpansionTemplate}
            showGridlines
            responsiveLayout="scroll"
            dataKey="id"
            header={header2}
            rows={1}
          >
            {/* <Column expander style={{ width: '3em' }} /> */}

            <Column field="Plant" header="Plant"></Column>
            <Column field="Supplier" header="Supplier Name"></Column>
            <Column field="May" header={dateMaker(currenYyear, currenMonth)} />
            <Column field="June" header={dateMaker(currenYyear, currenMonth + 1)} />
            <Column field="July" header={dateMaker(currenYyear, currenMonth + 2)} />
            <Column field="August" header={dateMaker(currenYyear, currenMonth + 3)} />
            <Column field="September" header={dateMaker(currenYyear, currenMonth + 4)} />
            <Column field="October" header={dateMaker(currenYyear, currenMonth + 5)} />

            <Column field="Total Quantity" header="Total Quantities" />
          </DataTable>
        </div>
        <div className="card">
          <DataTable
            value={plantData}
            //  expandedRows={expandedRows}
            //   onRowToggle={(e) => setExpandedRows(e.data)}
            //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
            //   rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            showGridlines
            responsiveLayout="scroll"
            // footer={footer}
            //header={header3}
            rows={6}

            //editMode="cell"
          >
            {/* <Column expander style={{ width: '3em' }} /> */}

            <Column field="Plant" header="Plant"></Column>
            <Column field="undefined" header="Name"></Column>
            <Column field="May" header={dateMaker(currenYyear, currenMonth)} />
            <Column field="June" header={dateMaker(currenYyear, currenMonth + 1)} />
            <Column field="July" header={dateMaker(currenYyear, currenMonth + 2)} />
            <Column field="August" header={dateMaker(currenYyear, currenMonth + 3)} />
            <Column field="September" header={dateMaker(currenYyear, currenMonth + 4)} />
            <Column field="October" header={dateMaker(currenYyear, currenMonth + 5)} />
            {/* <Column field=" " header="" /> */}
          </DataTable>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/Inventory">
            <Button className="previousbutton" label="Previous " style={{ marginRight: " 15px" }} />
          </Link>

          <Button className="nextbutton" label="Download Ordering schedule " style={{ marginLeft: " 15px" }} icon="pi pi-lock" />
        </div>
      </div>
    </div>
  );
};

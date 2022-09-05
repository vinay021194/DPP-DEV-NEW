import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import { Link } from "react-router-dom";

export const Inventory = (props) => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const [plantData2000, setplantData2000] = useState([]);
  const [supplierObject, setsupplierObject] = useState(null);

  let currenYyear = new Date().getFullYear() * 1;
  let currenMonth = new Date().getMonth() * 1;

  useEffect(() => {
    isMounted.current = true;
    productService.getMaterial().then((data) => {
      let materilaData = data.Sheet3.filter((data) => data.material === localStorage.getItem("Material"));
      setProducts(materilaData);
    });
    setsupplierObject(
      props.location.state?.supplierDetails ? props.location.state?.supplierDetails : window.supplierObject2
    );
    window.supplierObject = props.location.state?.supplierDetails;
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getInventoryInfo().then((data) => {
      let materilaData = data.Sheet3.filter(
        (data) => data.material === localStorage.getItem("Material") && data.plant === localStorage.getItem("plant")
      );
      setProducts2(materilaData);
    });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getPlantinventoryTable().then((data) => setPlantData(data));
    productService
      .getPlantinventoryTable()
      .then((data) => setplantData2000(data.Sheet1.filter((data) => data.plant === localStorage.getItem("plant"))));
  }, []);

  const dateMaker = (yr, mnt) => {
    const date = new Date(yr, mnt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    return date;
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span className={`products-badge status-${rowData.plant.toLowerCase()}`}>{rowData.status_level_inventory}</span>
    );
  };

  const header1 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Material</h5>
    </div>
  );

  const header2 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Inventory</h5>
      <h6 style={{ fontWeight: "lighter", fontFamily: "Poppins" }}>All quantities are in Tonnes</h6>
    </div>
  );
  const header3 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Plant- {localStorage.getItem("plant")}</h5>
      <h6 style={{ fontWeight: "lighter", fontFamily: "Poppins" }}>All values are in Tonnes</h6>
    </div>
  );

  const header5 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Forecasted Prices</h5>
      <h6 style={{ fontWeight: "lighter", fontFamily: "Poppins" }}>All prices are in US$/Tonne</h6>
    </div>
  );

  return (
    <div>
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
          Data Overview
        </h5>
        <div className="card">
          <DataTable value={products} responsiveLayout="scroll" dataKey="id" header={header1} rows={1}>
            <Column field="material" header="ID"></Column>
            <Column field="base_unit_of_measure (UOM)" header="UOM"></Column>
            <Column field="aliases" header="Aliases" />
            <Column field="material_type (SAP)" header="SAP" />
            <Column field="material_group (organisation)" header="Organization" />
            <Column field="mdrm_class (class)" header="Class" />
          </DataTable>
        </div>
        <div className="card">
          <DataTable value={products2} dataKey="id" header={header2} rows={4}>
            <Column field="plant" header="Plant ID"></Column>
            <Column field="plant_name" header="Plant Name"></Column>
            <Column field="safety_stock" header="Safety Stock"></Column>
            <Column field="opening_stock" header="Inventory" />
            <Column field="warehouse_capacity" header="Warehouse capacity" />
            <Column field="status_level_inventory" header="Status" body={statusOrderBodyTemplate} />
          </DataTable>
        </div>
        <div className="card">
          <DataTable value={plantData2000} dataKey="key" header={header3} rows={2}>
            <Column field="data" header=""></Column>
            <Column field="month_1" header={dateMaker(currenYyear, currenMonth)} />
            <Column field="month_2" header={dateMaker(currenYyear, currenMonth + 1)} />
            <Column field="month_3" header={dateMaker(currenYyear, currenMonth + 2)} />
            <Column field="month_4" header={dateMaker(currenYyear, currenMonth + 3)} />
            <Column field="month_5" header={dateMaker(currenYyear, currenMonth + 4)} />
            <Column field="month_6" header={dateMaker(currenYyear, currenMonth + 5)} />
          </DataTable>
        </div>
        <div className="card">
          <DataTable value={supplierObject} dataKey="id" header={header5} rows={3}>
            <Column field="name" header="Supplier"></Column>
            <Column field="month1" header={dateMaker(currenYyear, currenMonth)} />
            <Column field="month2" header={dateMaker(currenYyear, currenMonth + 1)} />
            <Column field="month3" header={dateMaker(currenYyear, currenMonth + 2)} />
            <Column field="month4" header={dateMaker(currenYyear, currenMonth + 3)} />
            <Column field="month5" header={dateMaker(currenYyear, currenMonth + 4)} />
            <Column field="month6" header={dateMaker(currenYyear, currenMonth + 5)} />
          </DataTable>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/orderOptimization/SupplierAnalysis">
            <Button className="previousbutton" label="Previous" style={{}} />
          </Link>
          <Link to="/orderOptimization/Orderingplant">
            <Button className="nextbutton" label="Generate ordering schedule" style={{ marginLeft: " 15px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

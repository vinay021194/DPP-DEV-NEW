import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { useHistory } from "react-router-dom";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { ProductService } from "../services/ProductService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./App.css";
import { AppMenu } from "./AppMenu";
import { AppTopbar } from "./AppTopbar";
import { CSSTransition } from "react-transition-group";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Chip } from "primereact/chip";
import { MultiSelect } from "primereact/multiselect";
import demantData from "../data/demand_info_regression_summary.json";

export const Materialdatachart = (props) => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  //const toast = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [
    demandInfoRegressionSummaryTable,
    setdemandInfoRegressionSummaryTable,
  ] = useState([]);
  const [HistoricalConsumptionSeriesData, setHistoricalConsumptionSeriesData] =
    useState([]);
  const [Plants, setPlants] = useState(false);

  const plantData = [
    { label: "2000", value: "2000" },
    { label: "3000", value: "3000" },
  ];
  console.log("Materialdatachart props====>", props);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  let menuClick = false;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  let month1 =
    month > 11
      ? months[month % 11] + "-" + year + 1
      : months[month] + "-" + year;
  let month2 =
    month + 1 > 11
      ? months[(month + 1) % 11] + "-" + year + 1
      : months[month + 1] + "-" + year;
  let month3 =
    month + 2 > 11
      ? months[(month + 2) % 11] + "-" + year + 1
      : months[month + 2] + "-" + year;
  let month4 =
    month + 3 > 11
      ? months[(month + 3) % 11] + "-" + year + 1
      : months[month + 3] + "-" + year;
  let month5 =
    month + 4 > 11
      ? months[(month + 4) % 11] + "-" + year + 1
      : months[month + 4] + "-" + year;
  let month6 =
    month + 5 > 11
      ? months[(month + 5) % 11] + "-" + year + 1
      : months[month + 5] + "-" + year;

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 3, 2, 7, 5, 11, 9],
      },
    ],
  };

  const chart3 = {
    chart: {
      zoomType: "x",
    },

    title: {
      text: "Historical Consumption and Forcasted Demand ",
    },
    subtitle: {
      // text: "Source: thesolarfoundation.com",
    },
    yAxis: {
      title: {
        text: "Quantity",
      },
    },
    xAxis: {
      title: {
        text: "Period",
      },
      plotBands: [
        {
          color: "#C8FDFB",
          from: month1,
          to: month6,
        },
      ],

      type: "datetime",
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    tooltip: {
      //layout: 'horizontal',
      //align: 'center',
      //verticalAlign: 'bottom',
      formatter: function () {
        return (
          "Color :  <b>" +
          this.point.color +
          "</b> </br> Executed on :  <b>" +
          this.point.executedOn +
          "</b> </br>  Period : <b>" +
          new Date(this.x).toUTCString() +
          " </b> </br> Plant :  <b>" +
          this.series.name +
          "</b> </br> Quantity :  <b>" +
          this.y +
          "</b>"
        );
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: HistoricalConsumptionSeriesData,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (isMounted.current) {
      const summary =
        expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
      //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
    }
  }, [expandedRows]);

  useEffect(() => {
    isMounted.current = true;
    productService.getMaterialInfo().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getInventoryInfo().then((data) => setProducts2(data));
  }, []);

  const onPlantChange = (e) => {
    setPlants(e.value);
    console.log(
      "demandInfoRegressionSummaryTable====>",
      demandInfoRegressionSummaryTable
    );
    let convertedData = demandInfoRegressionSummaryTable.map((el) => {
      let date = new Date(el.period);
      let milliseconds = date.getTime();

      return {
        executedOn: el.executed_on,
        plant: el.plant,
        x: milliseconds,
        y: Number(el.quantity),
        total_cons_converted_mp_level: el.total_cons_converted_mp_level,
      };
    });
    let exampleData = e.value.map((sr) =>
      convertedData.filter((el) => el.plant === sr)
    );
    console.log("exampleData in map ===>", exampleData);

    const chartData1 = e.value.map((sr, i) => {
      return {
        name: sr,
        data: exampleData[i],
      };
    });

    setPlants(e.value);
    setHistoricalConsumptionSeriesData(chartData1);
  };

  const onRowExpand = (event) => {
    //toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
  };

  const onRowCollapse = (event) => {
    // toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
  };

  const expandAll = () => {
    let _expandedRows = {};
    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

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
      <h5 style={{ fontWeight: "bolder", fontFamily: "Sans-serif" }}>
        Material Overview
      </h5>
    </div>
  );
  const headers = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Sans-serif" }}>
        Inventory
      </h5>
    </div>
  );
  const header2 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Sans-serif" }}>
        Plant2000
      </h5>
    </div>
  );
  const header3 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "Sans-serif" }}>
        Plant3000
      </h5>
    </div>
  );
  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        {/* <h5>Orders for {data.name}</h5> */}
        <DataTable value={data.orders} responsiveLayout="scroll" rows={1}>
          <Column field="id" header="Plant Id(Name)" sortable></Column>
          <Column field="name" header="Safety Stock" sortable></Column>
          <Column field="inventory" header="Inventory" sortable></Column>
          <Column field="status" header="WareHouse Capacity" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          {/* <Column field="" header="" body={statusOrderBodyTemplate} sortable></Column> */}
        </DataTable>
      </div>
    );
  };

  return (
    <div>
      <AppTopbar onToggleMenu={onToggleMenu} />
      {/* <Toast ref={toast} /> */}
      <div className="layout-main">
        <div className="card">
          <DataTable
            value={products.Sheet2}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey=""
            header={header}
            rows={4}
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="material" header="ID" sortable></Column>
            {/* <Column field="Discription" header="Discription" sortable ></Column> */}
            <Column
              field="base_unit_of_measure (UOM)"
              header="UOM"
              sortable
            ></Column>
            <Column field="aliases" header="Aliases" sortable />
            {/* <Column field="Criticality" header="Criticality" sortable  /> */}
            <Column field="material_type (SAP)" header="SAP" sortable />
            <Column
              field="material_group (organisation)"
              header="Organisation"
              sortable
            />
            <Column field="mdrm_class (class)" header="Class" />
          </DataTable>
        </div>
        <div className="card">
          <DataTable
            value={products2.Sheet3}
            //  expandedRows={expandedRows}
            // onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
            // rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={headers}
            rows={4}
          >
            {/* <Column expander style={{ width: '3em' }} /> */}

            <Column field="plant" header="PlantID(Name)"></Column>
            <Column field="safety_stock" header="Safety Stock"></Column>
            <Column field="opening_stock" header="Inventory" />
            <Column field="warehouse_capacity" header="Warehouse capacity" />
            <Column field="status_level_inventory" header="Status" />
          </DataTable>
        </div>
        <div className="card">
          <MultiSelect
            style={{ width: "49%", margin: "5px 10px" }}
            value={Plants}
            options={plantData}
            onChange={onPlantChange}
            optionLabel="label"
            placeholder="Select a Plant"
            display="chip"
          />
          <strong>From Year</strong>
          <Calendar
            style={{ width: "15%", margin: "5px 10px" }}
            id="icon"
            showIcon
            value={date1}
            onChange={(e) => setDate1(e.value)}
          />
          <strong>To Year</strong>
          <Calendar
            style={{ width: "15%", margin: "5px 10px" }}
            id="icon"
            showIcon
            value={date2}
            onChange={(e) => setDate2(e.value)}
          />
          <div>
            <HighchartsReact highcharts={Highcharts} options={chart3} />
          </div>
        </div>

        <div className="card">
          <DataTable
            value={products}
            //  expandedRows={expandedRows}
            // onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
            // rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header2}
            rows={4}
          >
            {/* <Column expander style={{ width: '3em' }} /> */}
            <Column field="" header=""></Column>
            <Column field="Discription" header="Jan21"></Column>
            <Column field="UOM" header="Feb21"></Column>
            <Column field="Aliases" header="Mar21" />
            <Column field="Criticality" header="Apr21" />
            <Column field="SAP" header="May21" />
            <Column field="Organisation" header="Jun21" />
            <Column field="Class" header="July21" />
            <Column field="Aliases" header="Aug21" />
            <Column field="Criticality" header="Sep21" />
            <Column field="SAP" header="Oct21" />
            <Column field="Organisation" header="Nov21" />
            <Column field="Class" header="Dec21" />
          </DataTable>
        </div>
        <div className="card">
          <DataTable
            value={products}
            //  expandedRows={expandedRows}
            //   onRowToggle={(e) => setExpandedRows(e.data)}
            //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
            //   rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header3}
            rows={5}
          >
            {/* <Column expander style={{ width: '3em' }} /> */}
            <Column field="data" header=""></Column>
            <Column field="Discription" header="Jan21"></Column>
            <Column field="UOM" header="Feb21"></Column>
            <Column field="Aliases" header="Mar21" />
            <Column field="Criticality" header="Apr21" />
            <Column field="SAP" header="May21" />
            <Column field="Organisation" header="Jun21" />
            <Column field="Class" header="July21" />
            <Column field="Aliases" header="Aug21" />
            <Column field="Criticality" header="Sep21" />
            <Column field="SAP" header="Oct21" />
            <Column field="Organisation" header="Nov21" />
            <Column field="Class" header="Dec21" />
          </DataTable>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a href="/">
          <Button label="Previous " style={{ margin: "3px 15px" }} />
        </a>
        <a href="CostDriversAnalysis">
          <Button label="Next" style={{ margin: "3px 15px" }} />
        </a>
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
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { useHistory } from "react-router-dom";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import { AppTopbar } from "./AppTopbar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MultiSelect } from "primereact/multiselect";
import demantData from "../data/demand_info_regression_summary.json";

export const Materialdatachart = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  //const toast = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [transposedData, setTransposedData] = useState([]);
  const [filteredTransposedData, setFilteredTransposedData] = useState([]);
  const [averageYearlyConsumption, setAverageYearlyConsumption] = useState([]);

  const [isSubmited, setIsSubmited] = useState(false);
  const [
    demandInfoRegressionSummaryTable,
    setdemandInfoRegressionSummaryTable,
  ] = useState([]);
  const [HistoricalConsumptionSeriesData, setHistoricalConsumptionSeriesData] =
    useState([]);
  const [Plants, setPlants] = useState(false);

  let plantData = [
    ...new Map(
      demandInfoRegressionSummaryTable.map((item) => [item["plant"], item])
    ).values(),
  ];
  plantData = plantData.map((ele) => {
    return { label: ele.plant, value: ele.plant };
  });

  // console.log("plantData==>", plantData);
  // console.log("Plants==>", Plants);

  let convertedData = demandInfoRegressionSummaryTable.map((el) => {
    let date = new Date(el.period);
    let milliseconds = date.getTime();
    return {
      executedOn: el.executed_on,
      plant: el.plant,
      x: milliseconds,
      y: Number(el.quantity),
      total_cons_converted_mp_level: el.total_cons_converted_mp_level,
      period_type: el.period_type,
    };
  });

  let filteredData = convertedData.filter(
    (ele) => ele.period_type === "Forecast"
  );

  let plotBandsStart = new Date().getMilliseconds();
  let plotBandsEnd = new Date().getMilliseconds();
  plotBandsStart = Math.min(...filteredData.map((item) => item.x));
  plotBandsEnd = Math.max(...filteredData.map((item) => item.x));

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
      text: " ",
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
          from: plotBandsStart,
          to: plotBandsEnd,
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
    setdemandInfoRegressionSummaryTable(demantData.Sheet1);

    productService
      .gettransposedData()
      .then((data) => setTransposedData(data.Sheet));
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getInventoryInfo().then((data) => setProducts2(data));
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getMaterial().then((data) => setProducts3(data));
  }, []);

  const onPlantChange = (e) => {
    setPlants(e.value);
  };

  const onsubmit = () => {
    setIsSubmited(true);

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

    if (date1 && date2) {
      convertedData = convertedData.filter(
        (data) =>
          new Date(data.executedOn) > new Date(date1) &&
          new Date(data.executedOn) < new Date(date2)
      );
    }

    let exampleData = Plants.map((sr) =>
      convertedData.filter((el) => el.plant === sr)
    );
    let filterData = Plants.map((sr) =>
      transposedData.filter((el) => el.key_mp.includes(sr))
    );

    const chartData1 = Plants.map((sr, i) => {
      return {
        name: sr,
        data: exampleData[i],
      };
    });

    let filterYearlyData = Plants.map((sr) =>
      products2.Sheet3.filter((el) => el.plant.includes(sr))
    );

    filterData = [].concat(...filterData);
    filterYearlyData = [].concat(...filterYearlyData);
    console.log("filterData===>", filterData);
    setAverageYearlyConsumption(filterYearlyData);
    setFilteredTransposedData(filterData);
    setHistoricalConsumptionSeriesData(chartData1);
  };

  const onRowExpand = (event) => {
    //toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
  };

  const onRowCollapse = (event) => {
    // toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
  };

  // const expandAll = () => {
  //   let _expandedRows = {};
  //   products.forEach((p) => (_expandedRows[`${p.id}`] = true));

  //   setExpandedRows(_expandedRows);
  // };

  // const collapseAll = () => {
  //   setExpandedRows(null);
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
      <h5 style={{ fontWeight: "bolder", fontFamily: "poppins" }}>
        Demand Prediction
      </h5>
    </div>
  );
  const headers = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "poppins" }}>Inventory</h5>
    </div>
  );

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span className={`products-badge status-${rowData.plant.toLowerCase()}`}>
        {rowData.status_level_inventory}
      </span>
    );
  };
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
      <div className="layout-main">
        <div className="card">
          <DataTable
            value={products3.Sheet3}
            // expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey=""
            header={header}
            rows={1}
          >
            <Column style={{ width: "3em" }} />
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
            <Column
              field="status_level_inventory"
              header="Status"
              body={statusOrderBodyTemplate}
            />
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
          <Button
            label="submit"
            style={{ margin: "3px 15px" }}
            onClick={onsubmit}
          />
          <div>
            <HighchartsReact highcharts={Highcharts} options={chart3} />
          </div>
          {isSubmited && (
            <>
              <div className="">
                <h5
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "poppins",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Average yearly Consumption
                </h5>
              </div>
              <DataTable
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "35%",
                }}
                value={averageYearlyConsumption} //products2.Sheet3
                dataKey="id"
                rows={2}
              >
                <Column field="plant" header=""></Column>
                <Column field="safety_stock" header="" showGridlines></Column>
              </DataTable>
            </>
          )}
        </div>
        {isSubmited && (
          <div className="card">
            <DataTable
              value={filteredTransposedData}
              paginator
              rows={12}
              rowsPerPageOptions={[4, 12, 20]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowGroupMode="rowspan"
              groupRowsBy="key_mp"
              sortMode="single"
              sortField="key_mp"
              sortOrder={1}
              responsiveLayout="scroll"
            >
              {/* <Column expander style={{ width: '3em' }} /> */}
              <Column field="key_mp" header="Material-Plant"></Column>
              <Column field="keys" header=""></Column>
              <Column field="Month1" header="May22" />
              <Column field="Month2" header="Jun22" />
              <Column field="Month3" header="July22" />
              <Column field="Month4" header="Aug22" />
              <Column field="Month5" header="Sep22" />
              <Column field="Month6" header="Oct22" />
              <Column field="Month7" header="Nov22" />
              <Column field="Month8" header="Dec22" />
              <Column field="Month9" header="Jan23" />
              <Column field="Month10" header="Feb23" />
              <Column field="Month11" header="March23" />
              <Column field="Month12" header="April23" />
            </DataTable>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="/">
            <Button
              className="previousbutton"
              label="Previous "
              style={{ marginRight: " 15px" }}
            />
          </a>
          <a href="CostDriversAnalysis">
            <Button
              className="nextbutton"
              label="Next"
              style={{ marginLeft: " 15px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

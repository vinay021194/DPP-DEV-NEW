import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button } from "primereact/button";
import "./App.css";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { Link } from "react-router-dom";
import icisForecastSummaryData from "../data/icis_forecast_summary_table_2.json";
import icisForecastSummaryData1 from "../data/icis_forecast_summary_table.json";
import pricepredictionData from "../data/price_pridection_table.json";
import {costDrivers} from "../appConstant"
import {sourceOption} from "../appConstant"

// import { Checkbox } from "primereact/checkbox";
export const MostInfluencialAnalysis = (props) => {
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  // const [checked, setChecked] = useState(false);
  // const [check, setCheck] = useState(false);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [costDriverSeriesData, setcostDriverSeriesData] = useState(false);
  const [icisForecastSummaryTable, seticisForecastSummaryTable] = useState(false);

  const [costDriver, setcostDriver] = useState(false);
  const [costDriverSeries, setcostDriverSeries] = useState(false);
  const [source, setSource] = useState(false);
  const [products, setProducts] = useState([]);
  const [seriesdropdown, setDropdown] = useState([]);
  const [AccuraciesTableData, setAccuraciesTableData] = useState([]);
  const [costDriversChartData, setCostDriversChartData] = useState([]);
  const [accuraciesJsonData, setAccuraciesJsonData] = useState([]);
  const [pricePridectionTable, setPricePridectionTableData] = useState([]);
  const [demandRegressionSummaryTable2, setdemandRegressionSummaryTable2] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");

  let year = new Date().getFullYear() * 1;
  let month = new Date().getMonth() * 1;
  let endYear = (month + 5) % 12 < month ? year + 1 : year;
  let lastMonth = (month + 5) % 12;
  let plotBandsStart = new Date(year, month, 1).getTime();
  let plotBandsEnd = new Date(endYear, lastMonth, 28).getTime();
  let lastDate = 1667068200000;
  let diffDate = plotBandsEnd - lastDate;

  const dateMaker = (yr, mnt) => {
    const date = new Date(yr, mnt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    return date;
  };

  let plotBandText = "Forecasts for next 6 months ( " + dateMaker(year, month) + "  to " + dateMaker(endYear, lastMonth) + " )";

  const onCostDriverChange = (event, localvalues) => {
    setcostDriverSeries([]);
    setcostDriverSeriesData([]);
    let allCostDrivers = "";
    console.log(localvalues);
    console.log(event);
    if (localvalues) {
      allCostDrivers = localvalues.map((d) => d.name);
    } else {
      allCostDrivers = event.value.map((d) => d.name);
    }
    let allseries = icisForecastSummaryData.data.Sheet.filter((data) => {
      return allCostDrivers.includes(data.material);
    });
    // allseries = allseries.map((data) => data.series);
    allseries = allseries.map((data) => {
      let obj = {
        name: data.series,
        code: data.key,
      };
      return obj;
    });

    allseries = [...new Set(allseries)];
    var unique = Array.from(new Set(allseries.map(JSON.stringify))).map(JSON.parse);
    setDropdown(unique);
    if (!localvalues) {
      setcostDriver(event.value);
      localStorage.setItem("CostDriver", JSON.stringify(event.value));
    } else {
      setcostDriver(localvalues);
    }
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  let menuClick = false;
  const isMounted = useRef(false);

  useEffect(() => {
    console.log("icisForecastSummaryData==>", icisForecastSummaryData);
    isMounted.current = true;
    productService
      .getIcisForecastSummaryTable2()

      .then((data) => seticisForecastSummaryTable(data));

    productService.getIcisForecastSummaryTable2().then((data) => {
      // console.log("data.Sheet===>", data.Sheet);
      let modifieData = data.Sheet.map((ele) => {
        return {
          key: ele.key,
          best_model: ele.best_model,
          top_influencers: ele.top_influencers.replaceAll("[", "").replaceAll("]", "").split(","),

          fifth_month_accuracy: (ele.fifth_month_accuracy * 1).toFixed(2),
          first_month_accuracy: (ele.first_month_accuracy * 1).toFixed(2),
          fourth_month_accuracy: (ele.fourth_month_accuracy * 1).toFixed(2),
          second_month_accuracy: (ele.second_month_accuracy * 1).toFixed(2),
          sixth_month_accuracy: (ele.sixth_month_accuracy * 1).toFixed(2),
          test_month_accuracy: (ele.test_month_accuracy * 1).toFixed(2),
          third_month_accuracy: (ele.third_month_accuracy * 1).toFixed(2),
          serial_name: ele.serial_name,
          material: ele.material,
          date: ele.date,
        };
      });
      // console.log("data=====>", data);
      setProducts(modifieData);
    });

    productService.getdemandRegressionSummaryTable2().then((data) => setdemandRegressionSummaryTable2(data));

    productService.getPricePridectionTable().then((data) => setPricePridectionTableData(data.Sheet));

    productService.getIcisForecastSummaryTable().then((data) => setCostDriversChartData(data));

    //  productService.getIcisForecastSummaryTable2NEW().then((data) => {
    productService.getPricePridectionTable().then((data) => {
      // console.log("table data ====>", data);
      let modifieData = data.Sheet.map((ele) => {
        return {
          key: ele?.key,
          best_model: ele?.best_model,
          top_influencers: ele?.top_influencers.replaceAll("[", "").replaceAll("'", "").replaceAll("]", "").split(","),
          fifth_month_accuracy: (ele?.["2022-09"] * 1).toFixed(2),
          first_month_accuracy: (ele?.["2022-05"] * 1).toFixed(2),
          fourth_month_accuracy: (ele?.["2022-08"] * 1).toFixed(2),
          second_month_accuracy: (ele?.["2022-06"] * 1).toFixed(2),
          sixth_month_accuracy: (ele?.["2022-10"] * 1).toFixed(2),
          //test_month_accuracy: (ele.ele['2022-05'] * 1).toFixed(2),
          third_month_accuracy: (ele?.["2022-07"] * 1).toFixed(2),
          serial_name: ele?.series_name,
          material: ele?.material_name,
          Accuracy_var: (ele?.accuracy_var * 1).toFixed(2),
          accuracy_vecm: (ele?.accuracy_vecm * 1).toFixed(2),
          accuracy_arima: (ele?.accuracy_arima * 1).toFixed(2),
        };
      });
      setAccuraciesJsonData(modifieData);
    });

    let costdriver = localStorage.getItem("CostDriver");
    let costdriverSeries = localStorage.getItem("costDriverSeries");
    costdriver = JSON.parse(costdriver);
    costdriverSeries = JSON.parse(costdriverSeries);
    if (costdriver && costdriverSeries) {
      setcostDriver(costdriver);
      setcostDriverSeries(costdriverSeries);
      onCostDriverChange(null, costdriver);
      oncostDriverSeriesChange(null, costdriverSeries, costdriver);
    }
  }, []);

  // let plotBandsStart = new Date("2022-05-01 03:00:00").getTime();
  // let plotBandsEnd = new Date("2023-05-01 03:00:00").getTime();

  // plotBandsStart = Math.min(...filteredData.map((item) => item.x));
  // plotBandsEnd = Math.max(...filteredData.map((item) => item.x));

  const costDriverAnalysisChart = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: plotBandText,
      align: "right",
      x: -10,
    },

    yAxis: {
      title: {
        text: "Unit Price (USD)",
      },
    },

    xAxis: {
      title: {
        text: "Date",
      },
      //categories: data2,
      // plotBands: [
      //   {
      //     color: "#D5DFE9",
      //     from: plotBandsStart,
      //     to: plotBandsEnd,
      //   },
      // ],
      plotBands: [
        {
          color: "#D5DFE9",
          from: plotBandsStart,
          to: plotBandsEnd,
        },
      ],

      type: "datetime",
    },

    tooltip: {
      valueDecimals: 2,
      formatter: function () {
        return "Series name :  <b>" + this.series.name + "</b> </br> Avg Price :  <b>" + this.y + "</b> </br> Date : <b>" + new Date(this.x).toUTCString() + "</b>";
      },
    },

    series: costDriverSeriesData,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {},
        },
      ],
    },
  };

  const onSourcechange = (e) => {
    console.log(e.value);
    localStorage.setItem("source", e.value);
    setSource(e.value);
  };

  const oncostDriverSeriesChange = (e, localvalues, costdrives) => {
    const icisForecastSummaryTabledata = icisForecastSummaryData1;
    let allmaterial = icisForecastSummaryData.data.Sheet.map((data) => {
      return data.serial_name; //key
    });
    let seriesValue = localvalues ? localvalues : e.value;
    console.log("seriesvlaues===>", seriesValue);
    console.log("icisForecastSummaryTabledata===>", icisForecastSummaryTabledata);
    allmaterial = [...new Set(allmaterial)]; //distinct key
    let exampleData = seriesValue.map((sr) =>
      icisForecastSummaryTabledata.Sheet1.filter((el) => el.key === sr.code).map((d) => {
        let date = d.date
          .split("/") // 3/23/04    ===>
          .map((d, i) => (i === 2 ? 20 + d : d)) //  20 +"04" == 2004
          .join("/"); //  [3, 23, 04] ==> 3/23/2004
        date = new Date(date);
        let milliseconds = date.getTime();
        milliseconds = diffDate > 0 ? milliseconds + Math.abs(diffDate) : milliseconds - Math.abs(diffDate);

        const dataObj = [milliseconds, Number(d.price)];
        return dataObj;
      })
    );
    console.log("exampleData", exampleData);
    const chartData1 = seriesValue.map((sr, i) => {
      return {
        name: sr.name,
        data: exampleData[i],
      };
    });
    console.log("chartData1", chartData1);

    let modifieData = pricepredictionData.data.Sheet.map((ele) => {
      return {
        key: ele?.key,
        best_model: ele?.best_model,
        top_influencers: ele?.top_influencers.replaceAll("[", "").replaceAll("'", "").replaceAll("]", "").split(","),
        fifth_month_accuracy: (ele?.["2022-09"] * 1).toFixed(2),
        first_month_accuracy: (ele?.["2022-05"] * 1).toFixed(2),
        fourth_month_accuracy: (ele?.["2022-08"] * 1).toFixed(2),
        second_month_accuracy: (ele?.["2022-06"] * 1).toFixed(2),
        sixth_month_accuracy: (ele?.["2022-10"] * 1).toFixed(2),
        //test_month_accuracy: (ele.ele['2022-05'] * 1).toFixed(2),
        third_month_accuracy: (ele?.["2022-07"] * 1).toFixed(2),
        serial_name: ele?.series_name,
        material: ele?.material_name,
        Accuracy_var: (ele?.accuracy_var * 1).toFixed(2),
        accuracy_vecm: (ele?.accuracy_vecm * 1).toFixed(2),
        accuracy_arima: (ele?.accuracy_arima * 1).toFixed(2),
      };
    });
    console.log("modifieData ===>", modifieData);
    let costDriverData = costdrives ? costdrives : costDriver;
    console.log("costDriverData ===>", costDriverData);

    let filterAccuraciesTableData = costDriverData.map((sr) => modifieData.filter((el) => el.material === sr.name));

    console.log("filterAccuraciesTableData11====>", filterAccuraciesTableData);

    filterAccuraciesTableData = [].concat(...filterAccuraciesTableData);

    filterAccuraciesTableData = seriesValue.map((sr) => filterAccuraciesTableData.filter((el) => el.key === sr.code));
    filterAccuraciesTableData = filterAccuraciesTableData.filter((el) => el.length > 0);

    // console.log("filterAccuraciesTableData===>", filterAccuraciesTableData);

    filterAccuraciesTableData = filterAccuraciesTableData.map((ele) => ele[0]);

    setAccuraciesTableData(filterAccuraciesTableData);
    setcostDriverSeries(seriesValue);

    localStorage.setItem("costDriverSeries", JSON.stringify(seriesValue));
    setcostDriverSeriesData(chartData1);
  };

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
      {/* <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>
      Accuracy (%)
      </h5> */}
    </div>
  );

  const topInfluencersTemplate = (rowData) => {
    //.log("rowData==>", rowData);
    if (rowData && rowData.top_influencers) {
      return (
        <div>
          {rowData.top_influencers[0] && <span>1. {rowData.top_influencers[0]}</span>}
          <br />
          {rowData.top_influencers[1] && <span>2. {rowData.top_influencers[1]}</span>}
          <br />
          {rowData.top_influencers[2] && <span>3. {rowData.top_influencers[2]}</span>}

          <br />
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const statusBodyTemplate = (rowData) => {
    // console.log("row Data===>", rowData);
    const tableData = [rowData];
    return (
      <>
        {/* <span>
          This Index has been forecasted using ARIMA, VAR, and VECM models..
        </span>{" "}
        <br />
        <span>Methos: Selection Criteria:</span>
        <br />
        <span>Accuracles of each model:</span>
        <br /> */}
        <div className="">
          <table role="grid">
            <thead className="p-datatable-thead">
              <tr role="row">
                <th role="columnheader" className="paddingThTd">
                  <span className="p-column-title"> Model</span>
                </th>
                <th role="columnheader" className="paddingThTd">
                  <span className="p-column-title">Accuracy</span>
                </th>
              </tr>
            </thead>
            <tbody className="p-datatable-tbody">
              <tr role="row" className={rowData.best_model === "ARIMA" ? "bestModel" : ""}>
                <td role="cell" className="paddingThTd">
                  <Button label="ARIMA" className="p-button-link" onClick={() => onClick("displayBasic")} />
                </td>
                <td role="cell" className="paddingThTd">
                  {rowData.accuracy_arima}
                </td>
              </tr>

              <tr role="row" className={rowData.best_model === "VAR" ? "bestModel" : ""}>
                <td role="cell" className="paddingThTd">
                  <Button label="VAR" className="p-button-link" onClick={() => onClick("displayBasic")} />
                </td>
                <td role="cell" className="paddingThTd">
                  {rowData.Accuracy_var}
                </td>
              </tr>

              <tr role="row" className={rowData.best_model === "VECM" ? "bestModel" : ""}>
                <td role="cell" className="paddingThTd">
                  <Button label="VAR" className="p-button-link" onClick={() => onClick("displayBasic")} />
                </td>
                <td role="cell" className="paddingThTd">
                  {rowData.accuracy_vecm}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* <AppTopbar onToggleMenu={onToggleMenu} props={props} /> */}
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
          Cost Drivers Analysis
        </h5>
        <div className="card">
          {/* <strong>Source</strong> */}
          <div style={{ display: "flex", margin: "5px 10px" }}>
            <MultiSelect
              style={{ width: "30%", margin: "5px 10px" }}
              value={source}
              options={sourceOption}
              onChange={onSourcechange}
              optionLabel="name"
              placeholder="Select a source"
              display="chip"
              optionDisabled={(options) => options.name === "IHS"}
            />
            <MultiSelect
              style={{ width: "49%", margin: "5px 10px" }}
              value={costDriver}
              options={costDrivers}
              onChange={onCostDriverChange}
              optionLabel="name"
              placeholder="Select a Cost Driver"
              display="chip"
            />

            <MultiSelect
              style={{ width: "49%", margin: "5px 10px" }}
              value={costDriverSeries}
              options={seriesdropdown}
              onChange={oncostDriverSeriesChange}
              optionLabel="name"
              placeholder="Select a Series"
              display="chip"
            />
          </div>

          <div style={{ width: "99%" }}>
            <HighchartsReact highcharts={Highcharts} options={costDriverAnalysisChart} />
          </div>
        </div>
        <div className="card">
          <DataTable value={AccuraciesTableData} header={header} rows={10}>
            <Column field="key" header="Index" />
            <Column field="best_model" header="Model Accuracies" style={{ width: "16em" }} body={statusBodyTemplate} />
            <Column field="top_influencers" header="Most Influencial Predictor" body={topInfluencersTemplate} style={{ width: "20em" }} />
            {/* <Column field="Accuracy_var" header="Accuracy (%)" /> */}
            <Column field="first_month_accuracy" header={dateMaker(year, month) + " ($)"} style={{ width: "7.5em" }} />
            <Column field="second_month_accuracy" header={dateMaker(year, month + 1) + " ($)"} style={{ width: "7.5em" }} />
            <Column field="third_month_accuracy" header={dateMaker(year, month + 2) + " ($)"} style={{ width: "7.5em" }} />
            <Column field="fourth_month_accuracy" header={dateMaker(year, month + 3) + " ($)"} style={{ width: "7.5em" }} />
            <Column field="fifth_month_accuracy" header={dateMaker(year, month + 4) + " ($)"} style={{ width: "7.5em" }} />
            <Column field="sixth_month_accuracy" header={dateMaker(year, month + 5) + " ($)"} style={{ width: "7.5em" }} />
          </DataTable>
        </div>
      </div>
      <Dialog visible={displayBasic} style={{ width: "50vw" }} onHide={() => onHide("displayBasic")}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </div>
  );
};
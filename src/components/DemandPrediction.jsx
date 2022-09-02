import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { ProductService } from "../services/ProductService";
import { Button } from "primereact/button";
import "./App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import demantData from "../data/demand_info_regression_summary.json";
import plantjsondata from "../data/inventory_info.json";
import transportdata from "../data/transportdata.json";
import { AutoComplete } from "primereact/autocomplete";

function DemandPrediction() {
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const isMounted = useRef(false);
  const productService = new ProductService();
  const [filteredTransposedData, setFilteredTransposedData] = useState([]);
  const [averageYearlyConsumption, setAverageYearlyConsumption] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [HistoricalConsumptionSeriesData, setHistoricalConsumptionSeriesData] = useState([]);
  const [materialinfo, setmMaterialInfo] = useState(null);
  const [filteredMaterialInfo, setfilteredMaterialInfo] = useState(null);
  const [Plantinfo, setPlantinfo] = useState(null);
  const [filteredPlantinfo, setfilteredPlantinfo] = useState(null);
  const [uniqPlant, setUniqPlant] = useState([]);
  const [Plantinfodata, setPlantinfoData] = useState([]);
  const [MaterialInfodata, setMaterialInfoData] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  let lastDate = 1680307200000;
  let year = new Date().getFullYear() * 1;
  let month = new Date().getMonth() * 1;
  let endYear = (month + 5) % 12 < month ? year + 1 : year;
  let lastMonth = (month + 5) % 12;
  let plotBandsStart = new Date(year, month, 1).getTime();
  let plotBandsEnd = new Date(endYear, lastMonth, 28).getTime();
  let diffDate = plotBandsEnd - lastDate;
  let maxDate = new Date(endYear, lastMonth, 28);
  let minDate = new Date(maxDate.getTime() - 160079200000);

  const dateMaker = (yr, mnt) => {
    const date = new Date(yr, mnt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    return date;
  };

  let plotBandText =
    "Forecasts for next 6 months ( " + dateMaker(year, month) + "  to " + dateMaker(endYear, lastMonth) + " )";

  useEffect(() => {
    isMounted.current = true;

    let demandPredictionPlants = JSON.parse(localStorage.getItem("demandPredictionPlants"));
    let demandPredictionMaterial = localStorage.getItem("demandPredictionMaterial");
    if (demandPredictionPlants) setPlantinfoData(demandPredictionPlants);
    if (demandPredictionMaterial) {
      setMaterialInfoData(demandPredictionMaterial);
      onsubmit();
    }

    productService.getPlantInfo().then((data) => {
      const uniq = (items) => [...new Set(items)];
      const uniqMaterial = uniq(data.map((item) => item.material.toString()));
      return setmMaterialInfo(uniqMaterial);
    });

    productService.getPlantInfo().then((data) => setPlantinfo(data));

    isMounted.current = true;

    setTimeout(() => {
      let startDate = localStorage.getItem("startDate");
      let endDate = localStorage.getItem("endDate");
      setDate1(startDate ? new Date(startDate) : minDate);
      setDate2(endDate ? new Date(endDate) : maxDate);
      if (startDate || endDate) {
        onsubmit();
      }
    }, 100);
  }, []);

  const chart3 = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: " ",
    },
    subtitle: {
      text: plotBandText,
      align: "right",
      x: -10,
    },
    yAxis: {
      title: {
        text: "Quantity(T)",
      },
    },
    xAxis: {
      title: {
        text: "Date",
      },
      plotBands: [
        {
          color: "#D5DFE9",
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
      formatter: function () {
        return (
          "</b> </br> Executed on :  <b>" +
          this.point.executedOn +
          "</b> </br>  Date : <b>" +
          new Date(this.x).toUTCString() +
          " </b> </br> Plant :  <b>" +
          this.series.name +
          "</b> </br> Quantity(T) :  <b>" +
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

  const searchMaterial = (event) => {
    setTimeout(() => {
      let _filteredMaterialInfo;
      if (!event.query.trim().length) {
        _filteredMaterialInfo = [...materialinfo];
      } else {
        _filteredMaterialInfo = materialinfo.filter((item) => item.includes(event.query));
      }
      setfilteredMaterialInfo(_filteredMaterialInfo);
    }, 250);
  };

  const searchPlantInfo = (event) => {
    setTimeout(() => {
      let _filteredPlantinfo;
      if (!event.query.trim().length) {
        _filteredPlantinfo = [...uniqPlant];
      } else {
        _filteredPlantinfo = uniqPlant.filter((item) => item.includes(event.query));
      }

      setfilteredPlantinfo(_filteredPlantinfo);
    }, 250);
  };

  const onMaterialChange = (e) => {
    setPlantinfoData([]);
    const filterPlant = Plantinfo.filter((item) => item.material == e.value);
    const uniq = (items) => [...new Set(items)];
    const uniqPlant = uniq(filterPlant.map((item) => item.plant.toString()));
    localStorage.setItem("demandPredictionMaterial", e.value);
    setUniqPlant(uniqPlant);
    setfilteredPlantinfo(uniqPlant);
    setMaterialInfoData(e.value);
    localStorage.setItem("demandPredictionPlants", JSON.stringify(uniqPlant));
    setPlantinfoData(uniqPlant);
  };

  const onPlantInfoChange = (e) => {
    localStorage.setItem("demandPredictionPlants", JSON.stringify(e.value));
    setPlantinfoData(e.value);
  };

  const onsubmit = () => {
    setIsSubmited(true);
    let plants = JSON.parse(localStorage.getItem("demandPredictionPlants")) || Plantinfodata;

    productService.getMaterial().then((data) => {
      let materilaData = data.Sheet3.filter(
        (data) => data.material === localStorage.getItem("demandPredictionMaterial")
      );
      setProducts3(materilaData);
    });

    productService.getInventoryInfo().then((data) => {
      let filteredIinventortData = plants.map((sr) => data.Sheet3.filter((el) => el.plant.includes(sr)));
      filteredIinventortData = [].concat(...filteredIinventortData);
      setProducts2(filteredIinventortData);
    });

    let proudctdata = plantjsondata;
    let convertedData = demantData.Sheet1.map((el) => {
      let date = new Date(el.period);
      let milliseconds = date.getTime();
      return {
        executedOn: el.executed_on,
        plant: el.plant,
        x: diffDate > 0 ? milliseconds + Math.abs(diffDate) : milliseconds - Math.abs(diffDate),
        y: Number(el.quantity),
        total_cons_converted_mp_level: el.total_cons_converted_mp_level,
      };
    });

    if (date1 && date2) {
      convertedData = convertedData.filter(
        (data) => data.x > new Date(date1).getTime() && data.x < new Date(date2).getTime()
      );
    }

    let exampleData = plants.map((sr) => convertedData.filter((el) => el.plant === sr));

    let tdata = transportdata.data.Sheet.map((ele) => {
      return {
        id: ele.id,
        key_mp: ele.key_mp,
        keys: ele.keys,
        Month1: ele.Month1,
        Month2: ele.Month2,
        Month3: ele.Month3,
        Month4: ele.Month4,
        Month5: ele.Month5,
        Month6: ele.Month6,
        Month7: ele.Month7,
        Month8: ele.Month8,
        Month9: ele.Month9,
        Month10: ele.Month10,
        Month11: ele.Month11,
        Month12: ele.Month12,
      };
    });

    let filterData = plants.map((sr) => tdata.filter((el) => el.key_mp.includes(sr)));

    const chartData1 = plants.map((sr, i) => {
      return {
        name: sr,
        data: exampleData[i],
      };
    });

    let filterYearlyData = plants.map((sr) => proudctdata.data.Sheet3.filter((el) => el.plant.includes(sr)));

    filterData = [].concat(...filterData);
    filterYearlyData = [].concat(...filterYearlyData);

    setAverageYearlyConsumption(filterYearlyData);
    setFilteredTransposedData(filterData);
    setHistoricalConsumptionSeriesData(chartData1);
  };

  const header = (
    <div className="table-header-container">
      <h5
        style={{
          fontWeight: "bolder",
          fontFamily: "poppins",
          display: "flex",
          justifyContent: "left",
        }}
      >
        Material
      </h5>
    </div>
  );

  const headers = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "poppins" }}>Inventory</h5>
      <h6 style={{ fontWeight: "lighter", fontFamily: "poppins" }}>Quantities are in Tonnes</h6>
    </div>
  );

  const headers2 = (
    <div className="table-header-container">
      <h5 style={{ fontWeight: "bolder", fontFamily: "poppins" }}>Inventory Status In Future (Without Buyer Action)</h5>
      <h6 style={{ fontWeight: "lighter", fontFamily: "poppins" }}> All values are in Tonnes</h6>
    </div>
  );

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span className={`productss-badge status-${rowData.status_level_material.toLowerCase()}`}>
        {rowData.status_level_inventory}
      </span>
    );
  };

  const handleStartDateChange = (e) => {
    localStorage.setItem("startDate", e.value);
    setDate1(e.value);
  };

  const handleEndDateChange = (e) => {
    localStorage.setItem("endDate", e.value);
    setDate2(e.value);
  };

  return (
    <div>
      <div className="layout-main">
        <div className="table-header-container">
          <h5
            style={{
              fontWeight: "bolder",
              fontFamily: "poppins",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            Demand Prediction
          </h5>
        </div>
        <div className="card">
          <AutoComplete
            value={MaterialInfodata}
            suggestions={filteredMaterialInfo}
            completeMethod={searchMaterial}
            dropdown
            placeholder="Select Material"
            onChange={onMaterialChange}
            aria-label="materialinfo"
            sorted
          />
          <AutoComplete
            value={Plantinfodata}
            suggestions={filteredPlantinfo}
            completeMethod={searchPlantInfo}
            dropdown
            placeholder="Select Plant"
            onChange={onPlantInfoChange}
            aria-label="plantinfo"
            sorted
            multiple
            style={{ marginLeft: "30px" }}
          />
          <Button id="btn" label="Submit" style={{ margin: "1px 15px" }} onClick={onsubmit} />
        </div>
        <div className="card">
          <DataTable value={products3} responsiveLayout="scroll" header={header} rows={1} showGridlines>
            <Column style={{ width: "3em" }} />
            <Column field="material" header="ID" />
            <Column field="base_unit_of_measure (UOM)" header="UOM" />
            <Column field="aliases" header="Aliases" />
            <Column field="material_type (SAP)" header="SAP" />
            <Column field="material_group (organisation)" header="Organization" />
            <Column field="mdrm_class (class)" header="Class" />
          </DataTable>
        </div>
        <div className="card">
          <DataTable value={products2} responsiveLayout="scroll" dataKey="id" header={headers} rows={4}>
            <Column field="plant" header="Plant ID" />
            <Column field="plant_name" header="Plant Name" />
            <Column field="safety_stock" header="Safety Stock" />
            <Column field="opening_stock" header="Unrestricted Stock" />
            <Column field="warehouse_capacity" header="Warehouse capacity" />
            <Column field="status_level_inventory" header="Status" body={statusOrderBodyTemplate} />
          </DataTable>
        </div>
        <div className="card">
          <AutoComplete
            value={Plantinfodata}
            suggestions={filteredPlantinfo}
            completeMethod={searchPlantInfo}
            dropdown
            placeholder="Select Plant"
            onChange={onPlantInfoChange}
            aria-label="plantinfo"
            sorted
            multiple
            style={{ marginLeft: "30px", marginRight: "30px" }}
          />
          <strong>From Year</strong>
          <Calendar
            style={{ width: "15%", margin: "5px 10px" }}
            id="icon"
            showIcon
            value={date1}
            onChange={(e) => handleStartDateChange(e)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd/mm/yy"
            yearRange="2015:2025"
          />
          <strong>To Year</strong>
          <Calendar
            style={{ width: "15%", margin: "5px 10px" }}
            id="icon"
            showIcon
            value={date2}
            onChange={(e) => handleEndDateChange(e)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd/mm/yy"
          />
          <Button id="btn" label="Submit" style={{ margin: "3px 15px" }} onClick={onsubmit} />
          <div className="table-header-container">
            <h5
              style={{
                fontWeight: "bolder",
                fontFamily: "poppins",
                margin: "20px",
              }}
            >
              Material Consumption at Plant(s)
            </h5>
          </div>
          <div>
            <HighchartsReact highcharts={Highcharts} options={chart3} />
          </div>

          <>
            <div className="">
              <h5
                style={{
                  fontWeight: "bolder",
                  fontFamily: "poppins",
                  display: "flex",
                  justifyContent: "left",
                  margin: "20px",
                }}
              >
                Average Yearly Consumption
              </h5>
            </div>
            <DataTable
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "left",
              }}
              value={averageYearlyConsumption} //products2.Sheet3
              dataKey="id"
              rows={2}
            >
              <Column field="plant" header="" />
              <Column field="averagedata" header="" showGridlines />
            </DataTable>
          </>
        </div>
        {isSubmited && (
          <div className="card">
            <DataTable
              value={filteredTransposedData}
              showGridlines
              rowGroupMode="rowspan"
              responsiveLayout="scroll"
              groupRowsBy="key_mp"
              sortMode="single"
              sortField="key_mp"
              sortOrder={1}
              header={headers2}
            >
              <Column field="key_mp" header="Material-Plant" style={{ border: "1px solid lightgray" }} />
              <Column field="keys" header="" style={{ border: "1px solid lightgray" }} />
              <Column field="Month1" header={dateMaker(year, month)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month2" header={dateMaker(year, month + 1)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month3" header={dateMaker(year, month + 2)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month4" header={dateMaker(year, month + 3)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month5" header={dateMaker(year, month + 4)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month6" header={dateMaker(year, month + 5)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month7" header={dateMaker(year, month + 6)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month8" header={dateMaker(year, month + 7)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month9" header={dateMaker(year, month + 8)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month10" header={dateMaker(year, month + 9)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month11" header={dateMaker(year, month + 10)} style={{ border: "1px solid lightgray" }} />
              <Column field="Month12" header={dateMaker(year, month + 11)} style={{ border: "1px solid lightgray" }} />
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemandPrediction;

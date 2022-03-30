import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductService from "../services/ProductService";
import ProcService from "../services/ProcService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MultiSelect } from "primereact/multiselect";
export class DemandAndInventoryAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryInfo: [],
      demandUITable: [],
      materialInfo: [],
      demandInfoRegressionSummaryTable: [],
      HistoricalConsumptionSeriesData: [],
      plants: [],
      material: this.props.location.material
    };

    this.productService = new ProductService();
    this.procService = new ProcService();

    this.plants = [
      // { label: "1200", value: "1200" },
      // { label: "1500", value: "1500" },
      // { label: "1800", value: "1800" },
      { label: "2000", value: "2000" },
      { label: "PC52", value: "PC52" },

      // { label: "3300", value: "3300" },
      // { label: "4100", value: "4100" },
    ];
  }

  componentDidMount() {
    console.log("this.props.location.material==>", window.material)
    this.procService
      .getInventoryInfo({ material: window.material })
      .then((data) =>
      {
        data.data = data.data.filter((d)=> d.material_number === window.material)
        console.log("data====>",data)
        data.data.forEach(function(r){
          let rValues = Object.entries(r);
          rValues.forEach(function(e){
            // e[0] is the key and e[1] is the value
            let n = Number(e[1]);
            if (!isNaN(n)) {
              r[e[0]] = n.toFixed(2);
            }
          }) 
        })
       this.setState({ inventoryInfo: data.data }
        )

      });

    this.procService.getDemandUITable({ material:window.material }).then((data) => {
        console.log("data in demand UI ===>",data)
        let distnctPlant = [...new Set(data.data.Sheet2.map((d)=> d.plant))];
        console.log("data in demand UI ===>",distnctPlant)
        this.setState({plants:distnctPlant})
        data.data.Sheet2 = data.data.Sheet2.filter((d)=> d.material === window.material)
        data.data.Sheet2.forEach(function(r){
        let rValues = Object.entries(r);
        rValues.forEach(function(e){
          // e[0] is the key and e[1] is the value
          let n = Number(e[1]);
          if (!isNaN(n)) {
            r[e[0]] = n.toFixed(2);
          }
        })
      })
      return this.setState({ demandUITable: data.data.Sheet2 });
    });

    this.procService.getMaterialInfo({ material:window.material }).then((data) => {
      console.log("data in getMaterialInfo===>",data)
      data = data.data.data.filter((d)=> d.material === window.material)
      return this.setState({ materialInfo: data });
    });

    this.procService
      .getDemandInfoRegressionSummaryTable({ material_number: window.material })
      .then((data) => {
        data.data.data = data.data.data.filter((d)=> d.material_number === window.material)

        return this.setState({
          demandInfoRegressionSummaryTable: data.data.data,
        });
      });
  }

  onPlantChange = (e) => {
    //console.log("event ===>", e);

    const { demandInfoRegressionSummaryTable } = this.state;

    // console.log(
    //   "demandInfoRegressionSummaryTable in map ===>",
    //   demandInfoRegressionSummaryTable
    // );

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

    //console.log("convertedData in map ===>", convertedData);

    let exampleData = e.value.map((sr) =>
      convertedData.filter((el) => el.plant === sr)
    );

    //console.log("exampleData in map ===>", exampleData);

    const chartData1 = e.value.map((sr, i) => {
      return {
        name: sr,
        data: exampleData[i],
      };
    });

    this.setState({
      plants: e.value,
      HistoricalConsumptionSeriesData: chartData1,
    });
  };

  render() {
    // console.log("state Data  =>", this.state);
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
        
        let month7 =
      month + 6 > 11
        ? months[(month + 6) % 11] + "-" + year + 1
        : months[month + 6] + "-" + year;
        let month8 =
        month + 7 > 11
          ? months[(month + 7) % 11] + "-" + year + 1
          : months[month + 7] + "-" + year;
          let month9 =
        month + 8 > 11
          ? months[(month + 8) % 11] + "-" + year + 1
          : months[month + 8] + "-" + year;
          let month10 =
        month + 9 > 11
          ? months[(month + 9) % 11] + "-" + year + 1
          : months[month + 9] + "-" + year;
          let month11 =
          month + 10 > 11
            ? months[(month + 10) % 11] + "-" + year + 1
            : months[month + 10] + "-" + year;
            let month12 =
            month + 11 > 11
              ? months[(month + 11) % 11] + "-" + year + 1
              : months[month + 11] + "-" + year;


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
      series: this.state.HistoricalConsumptionSeriesData,
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

    return (
      <div>
        <div className="card">
          <h5 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Material Information</h5>
          <DataTable value={this.state.materialInfo}>
            <Column
              field="material"
              header="Material Number"
              style={{ width: "14%" }}
            />
            <Column field="material_type" header="Type" style={{ width: "14%" }} />
            <Column
              field="material_description_1"
              header="Description"
              style={{ width: "30%" }}
            />
            <Column field="base_unit_of_measure" header="UOM" style={{ width: "14%" }} />

            <Column field="unspsc_material_group_desc" header="UNSPSC Description" style={{ width: "14%" }} />
          </DataTable>
        </div>

        <div className="card">
          <h5 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Inventory Analysis</h5>
          <DataTable
            value={this.state.inventoryInfo}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="plant" header="Plant" />
            <Column field="safety_stock" header="ROP" />
            <Column field="avg_consumption" header="Avg Annual Consumption"/>
            <Column field="UnristrictedStock" header="Available Stock"/>
            <Column field="totalConsumption" header="Potential Consumption"/>
            <Column field="open_pr_quantity" header="PR Quantity"/>
            <Column field="onroute_quantity" header="On Route Qty"/>
            <Column field="demand_period" header="Forecasted Period"/>
            <Column field="demand_model" header="Model Category"/>
            {/* <Column field="alert_category" header="Alert Category"/> */}
            {/* <Column field="diff_open_safety_stock" header="diff_open_safety_stock"/> */}
          </DataTable>
        </div>

        <div className="card">
          <h5 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Demand Prediction for next 6 months across all plants</h5>
          <DataTable
            value={this.state.demandUITable}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="plant" header="Plant" />
            <Column
              field="avg_total_consumption"
              header="Avg Annual Consumption"
            />
            <Column field="2022_03_01" header={`${month1}`} />
            <Column field="2022_04_01" header={`${month2}`} />
            <Column field="2022_05_01" header={`${month3}`} />
            <Column field="2022_06_01" header={`${month4}`} />
            <Column field="2022_07_01" header={`${month5}`} />
            <Column field="2022_08_01" header={`${month6}`} />
            <Column field="2022_09_01" header={`${month7}`} />
            <Column field="2022_10_01" header={`${month8}`} />
            <Column field="2022_11_01" header={`${month9}`} />
            <Column field="2022_12_01" header={`${month10}`} />
            <Column field="2023_01_01" header={`${month11}`} />
            <Column field="2023_02_01" header={`${month12}`} />
            <Column field="prediction_error" header="Prediction Accuracy" />
          </DataTable>
        </div>

        <div className="card">
          <div>
            <div>
              <MultiSelect
                style={{ width: "99.9%" }}
                value={this.state.plants}
                options={this.plants}
                onChange={(e) => this.onPlantChange(e)}
                optionLabel="label"
                placeholder="Select a Plant"
                display="chip"
              />
            </div>
          </div>

          <div style={{ width: "99%" }}>
            <HighchartsReact highcharts={Highcharts} options={chart3} />
          </div>
        </div>
      </div>
    );
  }
}

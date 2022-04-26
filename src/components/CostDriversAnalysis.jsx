import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../services/ProductService";
import ProcService from "../services/ProcService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import './App.css';
import { AppMenu } from "./AppMenu";
import { AppTopbar } from "./AppTopbar";
import { CSSTransition } from "react-transition-group";
import { MultiSelect } from "primereact/multiselect";
export const CostDriversAnalysis = () => {
  const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
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

  console.log('products',products)

  products = products.Sheet1.length>0 && products.map(ele=>{
    return{
      
      fifth_month_accuracy:(ele.fifth_month_accuracy*1).toFixed(2),
      first_month_accuracy:(ele.first_month_accuracy*1).toFixed(2),  
      fourth_month_accuracy:(ele.fourth_month_accuracy*1).toFixed(2),
      second_month_accuracy:(ele.second_month_accuracy*1).toFixed(2),
      sixth_month_accuracy:(ele.sixth_month_accuracy*1).toFixed(2),
      test_month_accuracy:(ele.test_month_accuracy*1).toFixed(2),
      third_month_accuracy:(ele.third_month_accuracy*1).toFixed(2),
    }
  })
//  
// top_influencers: "Acrylate Esters (Europe)Butyl Acrylate Spot Weekly MTBE (Europe)Raffinate 1 Spot WeeklyRaffinate 1 (Europe)Raffinate 1 Spot Weekly"

 const onCostDriverChange = (event) => {
    //console.log("onCostDriverChange event ====>", event.value);

    let allseries = icisForecastSummaryTable.Sheet.filter((data)=>
       event.value.some(
         (data)=>data.material === event.value.name
       )
    )
    allseries = allseries.map((data)=> data.series)
    //console.log("allseries===>",allseries)
    allseries = [...new Set(allseries)]
    //console.log("allseries===>",allseries)
    let result = seriesName.filter(o => allseries.some((data) => o.name === data));
    //console.log("results====>",result)
    setDropdown(result)
    setcostDriver(event.value );
  };


  const sourceOption =[
    {
      name: "IHS",
      code: "IHS",
    },
    {
      name: "ICIS",
      code: "ICIS",
    },
  ]
  const  seriesName = [
    {
      name: "LLDPE Bulk Africa E Weekly",
      code: "LLDPE Bulk Africa E Weekly",
    },
    {
      name: "PE LLDPE Film Butene CFR Peru International 0 - 6 Weeks",
      code: "PE LLDPE Film Butene CFR Peru International 0 - 6 Weeks",
    },
    {
      name: "Flat Yarn Contract China Weekly",
      code: "Flat Yarn Contract China Weekly",
    },
    {
      name: "Propylene Bulk NWE Monthly",
      code: "Propylene Bulk NWE Monthly",
    },
    {
      name: "HDPE Blow Mould Posted EU Weekly",
      code: "HDPE Blow Mould Posted EU Weekly",
    },
    {
      name: "LDPE High Grade Contract US Monthly",
      code: "LDPE High Grade Contract US Monthly",
    },
    {
      name: "Copolymer Film Contract US Monthly",
      code: "Copolymer Film Contract US Monthly",
    },
    {
      name: "LDPE Contract CFR Egypt Weekly",
      code: "LDPE Contract CFR Egypt Weekly",
    },
    {
      name: "Film Posted Bulk China Weekly",
      code: "Film Posted Bulk China Weekly",
    },
    {
      name: "HDPE Film Contract EU Weekly",
      code: "HDPE Film Contract EU Weekly",
    },
    {
      name: "LDPE High Grade Peru International Weekly",
      code: "LDPE High Grade Peru International Weekly",
    },
    {
      name: "HDPE Bulk Contract DEL US Monthly",
      code: "HDPE Bulk Contract DEL US Monthly",
    },
    {
      name: "Copolymer Domestic UK Weekly",
      code: "Copolymer Domestic UK Weekly",
    },
  ];



  const costDrivers = [
    {
      name: "Polyethylene (Africa)",
      code: "Polyethylene (Africa)",
    },
    {
      name: "Polypropylene (Middle East)",
      code: "Polypropylene (Middle East)",
    },
    {
      name: "Polyethylene (Latin America)",
      code: "Polyethylene (Latin America)",
    },
    {
      name: "Polypropylene (Europe)",
      code: "Polypropylene (Europe)",
    },
    { name: "Polyethylene (Europe)", code: "Polyethylene (Europe)" },
    { name: "Polypropylene (US)", code: "Polypropylene (US)" },
    { name: "Polyethylene (US)", code: "Polyethylene (US)" },
  ];

  let menuClick = false;
  let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    const isMounted = useRef(false);


  let month1 = Date.UTC(year, month, 1);
  let month6 = Date.UTC(year, month + 5, 1);

  // useEffect(() => {
  //   isMounted.current = true;
  //   productService.getIcisForecastSummaryTable().then(data =>{
  //     const materialOptions = (data.map((d)=>{
  //      return d.material;
  //     }));
  //     //materialOptions = [...new Set(materialOptions.map(item=>item))]
  //     //console.log(materialOptions)
  //     seticisForecastSummaryTable(data)});
  // }, []);
  useEffect(() => {
    isMounted.current = true;
    productService.getIcisForecastSummaryTable2().then(data => seticisForecastSummaryTable(data));
    productService.getIcisForecastSummaryTable2().then(data => setProducts(data));

}, []); 



  const costDriverAnalysisChart = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Unit Price (USD)",
      },
    },

    xAxis: {
      title: {
        text: "Day of Date",
      },
      //categories: data2,
      plotBands: [
        {
          color: "#C8FDFB",
          from: month1,
          to: month6,
        },
      ],

      type: "datetime",
    },

    // legend: {
    //   layout: "horizontal",
    //   align: "center",
    //   verticalAlign: "bottom",
    // },

    tooltip: {
      // layout: "horizontal",
      // align: "center",
      // verticalAlign: "bottom",
      valueDecimals: 2,
      formatter: function () {
        //var timeInterwal = $("#chart").val();
        ////console.log("timeInterwal ===>", timeInterwal)
        //var chart = timeInterwal == "Weekly" ? 'Weekly Returns :  <b>' + this.point.weeklyReturn + '</b>' : 'Monthly Returns :  <b>' + this.point.monthly_returns + '</b>'
        //var Percentile = timeInterwal == "Weekly" ? ' </br> Percentile of Weekly Returns :  <b>' +
        //    this.point.weeklyPercentageReturn + '</b> ' : ' </br> Percentile of Monthly Returns :  <b>' +
        //    this.point.mothlyPercentageReturn + '</b> '
        return (
          "Series name :  <b>" +
          this.series.name +
          "</b> </br> Avg Price :  <b>" +
          this.y +
          "</b> </br> Day of Date : <b>" +
          new Date(this.x).toUTCString() +
          "</b>"
        );
      },
    },

    series: costDriverSeriesData,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            // legend: {
            //   layout: "horizontal",
            //   align: "center",
            //   verticalAlign: "bottom",
            // },
          },
        },
      ],
    },
  };

 

  const onSourcechange = (e) =>{
    setSource(e.value);

  }
  const oncostDriverSeriesChange = (e) => {
    //console.log("on oncostDriverSeriesChange event  ==>", e);
    const  icisForecastSummaryTabledata  = icisForecastSummaryTable;
    let allmaterial = icisForecastSummaryTable.Sheet.map((data)=>{
      return data.serial_name
    })
    allmaterial = [...new Set(allmaterial)]
    console.log("allmaterial====>",allmaterial)
    let exampleData = e.value.map((sr) =>
    
    icisForecastSummaryTabledata.Sheet
        .filter((el) => el.serial_name === sr.name)
        .map((d) => {
          // console.log("data in map ===>", d);
          let date = d.date
            .split("/") // 3/23/04  ===>
            .map((d, i) => (i === 2 ? 20 + d : d)) //  20 +"04" == 2004
            .join("/"); //  [3, 23, 04] ==> 3/23/2004
          date = new Date(date);
          let milliseconds = date.getTime();

          var dataObj = [milliseconds, Number(d.price)];
          return dataObj;
        })
    );

    const chartData1 = e.value.map((sr, i) => {
      return {
        name: sr.name,
        data: exampleData[i].splice(-150),
      };
    });

    setcostDriverSeries(e.value);
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
       <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Accuracies</h5>
    </div>
);

  return (
    <div >
      <AppTopbar onToggleMenu={onToggleMenu} />
      {/* <Toast ref={toast} /> */}
      <div className='layout-main'>

        <div className="card">
        <h5 style={{ fontWeight:"bolder", fontFamily:'poppins' }}>Cost Drivers Analysis</h5>
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
            {/* <Button
              label="Submit"
              style={{ margin: "3px 15px" }}
            /> */}
          <div style={{ width: "99%" }}>
          <HighchartsReact highcharts={Highcharts} options={costDriverAnalysisChart} />
          </div>
          
        </div>
        <div className="card">
        
          <DataTable
            value={products.Sheet}
            //paginator
            header={header}   
            rows={2}
            
            // rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column field="key" header="Index" />
            <Column field="best_model" header="Model"/>
            <Column
              field="top_influencers"
              header="top 3 influsencial indices"
            />
            <Column
              field="test_month_accuracy"
              header="test"
            />
                    <Column field= "first_month_accuracy" header="Jan21"  ></Column>
                    <Column field="second_month_accuracy" header="Feb21"  ></Column>
                    <Column field="third_month_accuracy" header="Mar21" />
                    <Column field="fourth_month_accuracy" header="Apr21" />
                    <Column field="fifth_month_accuracy" header="May21" />
                    <Column field="sixth_month_accuracy" header="Jun21" />
          </DataTable>
        </div>
        <div style={{ display:'flex',justifyContent:'center' }}>
      <a href='Materialdatachart'>
            <Button
            className='previousbutton'
              label="Previous "
              style={{ marginRight: " 15px"  }}
            />
            </a>
            <a href='SupplierAnalysis'>
            <Button
            className='nextbutton'
              label="Next"
              style={{ marginLeft: " 15px"  }}
            />
            </a>
      </div>
      </div>
     
    </div>


  );
}

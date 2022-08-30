import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import Highcharts, { color, Globals } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import dataHistorical from "../data/historicalunitpric.json";
import { Link } from "react-router-dom";
import ProcService from "../services/ProcService";
import { ProductService } from "../services/ProductService";
import { supplierFormulaData } from "../appConstant";

export class SupplierAnalysis extends Component {
  emptyProduct = {
    id: null,
    name: "",
    quality: 0,
    price: 0,
    Material_Number: "",
    Composition: 0,
    Percentage: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      materialCostDriverOutput: [],
      materialInfo: [],
      costDriver: this.props.location.state ? this.props.location.state.costDriver : null,
      seriesName: this.props.location.state ? this.props.location.state.seriesName : [],
      plant: { name: "2000", code: "2000" },
      products: this.props.location.state ? this.props.location.state.products : [],

      countries: [],
      product: this.emptyProduct,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      selectedProducts: null,
      submitted: false,
      globalFilter: null,
      filteredCountries: null,
      selectedCity1: null,
      selectedCity2: null,
      filteredCities: null,
      HistoricalChartData: [],
      ForecastedData: [],
      supplierDetails: [],
      value: { name: "Global", code: "Global" },
    };

    this.values = [{ name: "Global", code: "Global" }];

    // this.cities = [
    //   {
    //     name: "Film Posted DEL India 0-7 Days",
    //     code: "Film Posted DEL India 0-7 Days",
    //   },
    //   {
    //     name: "HDPE Blow Mould Domestic FD EU no-data",
    //     code: "HDPE Blow Mould Domestic FD EU no-data",
    //   },
    //   {
    //     name: "Flat Yarn (Raffia) Spot DEL India W 0-7 Days",
    //     code: "Flat Yarn (Raffia) Spot DEL India W 0-7 Days",
    //   },
    //   {
    //     name: "HDPE Film Domestic FD EU no-data",
    //     code: "HDPE Film Domestic FD EU no-data",
    //   },
    // ];

    // this.plants = [
    //   { name: "2000", code: "2000" },
    //   { name: "3000", code: "3000" },
    // ];

    this.countries = [
      {
        name: "Polypropylene (Middle East)",
        code: "Polypropylene (Middle East)",
      },
      { name: "Polyethylene (Europe)", code: "Polyethylene (Europe)" },
    ];

    // this.supplierFormula = [
    //   {
    //     name: "A",
    //     code: "A",
    //   },
    //   {
    //     name: "A",
    //     code: "A",
    //   },
    //   {
    //     name: "A",
    //     code: "A",
    //   },
    //   {
    //     name: "A",
    //     code: "A",
    //   },
    // ];

    this.searchCountry = this.searchCountry.bind(this);
    this.editingCellRows = {};
    this.originalRows = {};
    this.productService = new ProductService();
    this.procService = new ProcService();
    this.saveProduct = this.saveProduct.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.openNew = this.openNew.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
    this.onRowEditCancel2 = this.onRowEditCancel2.bind(this);
    this.onRowEditChange = this.onRowEditChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
    this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    this.onCityChange = this.onCityChange.bind(this);

    this.weeklyValues = {
      "Polyethylene (Africa)-LLDPE Bulk Africa E Weekly": [
        1365.2203389830509, 1337.8064516129032, 1314.311475409836, 1319.4754098360656, 1313.8387096774193,
        1348.5833333333333,
      ],

      "Polypropylene (US)-Homopolymer Bulk US Monthly": [
        1365.2203389830509, 1337.8064516129032, 1314.311475409836, 1319.4754098360656, 1313.8387096774193,
        1348.5833333333333,
      ],

      "Polypropylene (Middle East)-Film Posted Bulk China Weekly": [
        1470.7, 1443.25, 1428.0689655172414, 1450.3548387096773, 1417, 1387.1666666666667,
      ],

      "Polyethylene (US)-HDPE Bulk Contract DEL US Monthly": [
        1448.2105263157894, 1436.72131147541, 1440.0166666666667, 1451.3387096774193, 1456.4354838709678, 1457.3,
      ],
    };
  }

  componentDidMount() {
    this.procService
      .getMaterialCostDriverOutput({ material: 7001733 })
      .then((data) => this.setState({ materialCostDriverOutput: data.data.Sheet3 }));
    this.procService
      .getIcisForecastSummaryTable()
      .then((data) => this.setState({ ForecastedData: data?.data?.Sheet1 }));

    this.procService.getMaterialInfo({ material: 7001733 }).then((data) => {
      return this.setState({ materialInfo: data });
    });

    this.onPlantChange2(this.state.plant);
    let suppliers = localStorage.getItem("suppliers");
    // console.log("suppliers: " + suppliers);
    if (suppliers) {
      suppliers = JSON.parse(suppliers);
      this.convertData(suppliers);
      this.setState({ products: suppliers });
    }
  }

  Onsave = () => {
    const { costDriver, seriesName, products, plant } = this.state;
    this.props.history.push("/SupplierAnalysis", {
      costDriver,
      seriesName,
      products,
      plant,
    });
  };

  SubmitValueselectedCity1 = (e) => {
    this.props.handleData(this.state.selectedCity1);
  };
  onCityChange = (e) => {
    this.setState({ selectedCity1: e.target.value });
  };

  optimize = () => {
    this.props.history.push("/orderOptimization/Inventory", {
      supplierDetails: window.supplierObject,
    });
  };

  onPlantChange2 = (plantValue) => {
    this.setState({ plant: plantValue });
    this.procService.getHistoricalUnitPrice({ material: 7001733 }).then((res) => {
      const plant = plantValue;
      let currentyear = new Date().getFullYear() * 1;
      let currentMonth = new Date().getMonth() * 1;
      let resData = dataHistorical.Sheet2;
      const filterByPlantData = resData.filter((el) => el.plant === plant.name);
      const unitPriceUSD = filterByPlantData.map((el) => {
        let date = el.posting_date
          .split("/") // 3/23/04  ===>
          .map((d, i) => (i === 2 ? 20 + d : d)) //  20 +"04" == 2004
          .join("/"); //  [3, 23, 04] ==> 3/23/2004

        date = new Date(date);
        let milliseconds = date.getTime();
        let diffDate = new Date(currentyear, currentMonth, 8).getTime() - new Date(2022, 4, 5).getTime();
        milliseconds = diffDate > 0 ? milliseconds + Math.abs(diffDate) : milliseconds - Math.abs(diffDate);

        return [milliseconds, Number(el.unit_price_usd)];
      });

      const chartData = [
        {
          name: plant.name,
          data: unitPriceUSD.slice(-12),
        },
      ];

      return this.setState({ HistoricalChartData: chartData });
    });
  };

  onPlantChange = (e) => {
    this.setState({ plant: e.target.value });

    this.procService.getHistoricalUnitPrice({ material: 7001733 }).then((res) => {
      const plant = e.target.value;
      let resData = dataHistorical.Sheet2;
      const filterByPlantData = resData.filter((el) => el.plant === plant.name);
      const unitPriceUSD = filterByPlantData.map((el) => {
        let date = el.posting_date
          .split("/") // 3/23/04  ===>
          .map((d, i) => (i === 2 ? 20 + d : d)) //  20 +"04" == 2004
          .join("/"); //  [3, 23, 04] ==> 3/23/2004

        date = new Date(date);
        let milliseconds = date.getTime();

        return [milliseconds, Number(el.unit_price_usd)];
      });

      const chartData = [
        {
          name: plant.name,
          data: unitPriceUSD.slice(-12),
        },
      ];

      return this.setState({ HistoricalChartData: chartData });
    });
  };

  searchCountry(event) {
    setTimeout(() => {
      let filteredCountries;
      if (!event.query.trim().length) {
        filteredCountries = [...this.state.countries.name];
      } else {
        filteredCountries = this.countries.filter((country) =>
          country.name.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }

      this.setState({ filteredCountries });
    }, 250);
  }

  onEditorValueChange(productKey, props, value) {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    this.setState({ [`${productKey}`]: updatedProducts });
  }

  statusEditor(productKey, props) {
    return (
      <Dropdown
        value={props.rowData["inventoryStatus"]}
        options={this.statuses}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => this.onEditorValueChange(productKey, props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>;
        }}
      />
    );
  }

  inputTextEditor(productKey, props, field) {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)}
      />
    );
  }

  nameEditor(productKey, props) {
    return this.inputTextEditor(productKey, props, "name");
  }

  quatityEditor(productKey, props) {
    return (
      <InputText
        type="text"
        value={props.rowData["quantity"]}
        onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)}
      />
    );
  }

  priceEditor(productKey, props) {
    return (
      <InputNumber
        value={props.rowData["price"]}
        onValueChange={(e) => this.onEditorValueChange(productKey, props, e.value)}
      />
    );
  }
  leadTime = (productKey, props) => {
    return (
      <InputNumber
        value={props.rowData["Percentage"]}
        onValueChange={(e) => this.onEditorValueChange(productKey, props, e.value)}
      />
    );
  };

  onEditorSubmit(e) {
    const { rowIndex: index, field } = e.columnProps;
    delete this.editingCellRows[index][field];
  }

  onRowEditInit(event) {
    this.originalRows[event.index] = { ...this.state.products[event.index] };
  }

  onRowEditCancel(event) {
    let products = [...this.state.products];
    products[event.index] = this.originalRows[event.index];
    delete this.originalRows[event.index];

    this.setState({ products3: products });
  }

  onRowEditInit2(event) {
    this.originalRows2[event.index] = { ...this.state.products4[event.index] };
  }

  onRowEditChange(event) {
    this.setState({ editingRows: event.data });
  }
  onRowEditCancel2(event) {
    let products = [...this.state.products4];
    products[event.index] = this.originalRows2[event.index];
    delete this.originalRows2[event.index];
    this.setState({ products4: products });
  }

  openNew() {
    this.setState({
      product: this.emptyProduct,
      submitted: false,
      productDialog: true,
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      productDialog: false,
    });
  }
  hideDeleteProductDialog() {
    this.setState({ deleteProductDialog: false });
  }

  hideDeleteProductsDialog() {
    this.setState({ deleteProductsDialog: false });
  }

  saveProduct() {
    let state = { submitted: true };
    if (this.state.product.name.trim()) {
      let products = [...this.state.products];
      let product = { ...this.state.product };
      if (this.state.product.id) {
        const index = this.findIndexById(this.state.product.id);
        products[index] = product;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        product.id = this.createId();
        product.image = "product-placeholder.svg";
        products.push(product);
        this.convertData(products);
        // console.log("inside else");
        localStorage.setItem("suppliers", JSON.stringify(products));
      }

      state = {
        ...state,
        products,
        productDialog: false,
        product: this.emptyProduct,
      };
      // console.log("products: " + products);
    }
    this.setState(state);
  }

  createId() {
    let id = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  editProduct(product) {
    this.setState({
      product: { ...product },
      productDialog: true,
    });
  }

  confirmDeleteProduct(product) {
    this.setState({
      product,
      deleteProductDialog: true,
    });
  }

  deleteProduct() {
    // <<<<<<< HEAD
    // supplierDetails
    // console.log("deleteProduct");
    let products = this.state.products.filter((val) => val.id !== this.state.product.id);
    let filteredSupplierDetails = this.state.supplierDetails.filter(
      (val) => val.forecastedObj.name !== this.state.product.name
    );
    // console.log("filteredSupplierDetails before===>", filteredSupplierDetails);
    this.setState({
      ...this.state,
      products,
      supplierDetails: filteredSupplierDetails,
      deleteProductDialog: false,
      product: this.emptyProduct,
    });
    localStorage.setItem("suppliers", JSON.stringify(products));

    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  }

  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let product = { ...this.state.product };
    const data = supplierFormulaData ? supplierFormulaData.filter((data) => data.supplier_name === e.value) : "";
    product["name"] = data[0].supplier_name;
    product["price"] = data[0].capacity;
    product["quantity"] = data[0].formulae;
    product["Percentage"] = data[0].lead_time_months;

    this.setState({ product });
  }

  onInputNumberChange(e, name) {
    // const val = e.value || 0;
    // let product = { ...this.state.product };
    // product[`${name}`] = val;
    // this.setState({ product });
  }

  convertData = (products) => {
    //const { data } = this.state;
    let data = dataHistorical.Sheet2;
    if (data) {
      let suppliers = products;
      let forecastedObj = {};
      let leadTimeObj = {};
      let supplierMaxCapacity = {};
      //console.log("suppliers  =====>", suppliers);
      let convertedData = suppliers.map((el) => {
        if (Number(el.quantity)) {
          forecastedObj = {
            name: el.name,
            field: "Forecasted Price",
            month1: Number(el.quantity),
            month2: Number(el.quantity),
            month3: Number(el.quantity),
            month4: Number(el.quantity),
            month5: Number(el.quantity),
            month6: Number(el.quantity),
          };
          leadTimeObj = {
            name: el.name,
            field: "Lead Time",
            month1: el.Percentage,
            month2: el.Percentage,
            month3: el.Percentage,
            month4: el.Percentage,
            month5: el.Percentage,
            month6: el.Percentage,
          };
          supplierMaxCapacity = {
            name: el.name,
            field: "Supplier Max. Capacity",
            //OptimizeName : "Capacity",
            month1: el.price,
            month2: el.price,
            month3: el.price,
            month4: el.price,
            month5: el.price,
            month6: el.price,
          };
        } else {
          let data = this.state.ForecastedData;

          var regex = /\[/gi,
            result,
            indices = [];

          let allseries = suppliers.map((p) => {
            let startIndex = p.quantity.indexOf("[");
            let lastIndex = p.quantity.indexOf("]");
            let seriesname = p.quantity.substring(startIndex + 1, lastIndex);
            return seriesname;
          });

          let str = el.quantity;

          while ((result = regex.exec(str))) {
            indices.push(result.index);
          }

          let res = [];
          for (let i = 0; i < 6; i++) {
            let startIndex = el.quantity.indexOf("[");
            let lastIndex = el.quantity.indexOf("]");

            let seriesname = el.quantity.substring(startIndex + 1, lastIndex);
            let duplicate = el.quantity;
            let duplicateSeriesArr = [...allseries];
            let strArr = duplicate.split("");
            while (strArr.indexOf("[") !== -1) {
              let avgMonthData = this.weeklyValues[seriesname][i];
              let index = strArr.indexOf("[");
              let startIndex = strArr.indexOf("[");
              let lastIndex = strArr.indexOf("]");

              strArr.splice(startIndex, lastIndex + 1, avgMonthData);
              duplicateSeriesArr.shift();
            }
            res.push(Number(eval(strArr.join("")).toFixed(2)));
          }
          forecastedObj = {
            name: el.name,
            field: "Forecasted Price",
            month1: res[0],
            month2: res[1],
            month3: res[2],
            month4: res[3],
            month5: res[4],
            month6: res[5],
          };

          leadTimeObj = {
            name: el.name,
            field: "Lead Time",
            month1: el.Percentage,
            month2: el.Percentage,
            month3: el.Percentage,
            month4: el.Percentage,
            month5: el.Percentage,
            month6: el.Percentage,
          };

          supplierMaxCapacity = {
            name: el.name,
            field: "Supplier Max. Capacity",
            //OptimizeName : "Capacity",
            month1: el.price,
            month2: el.price,
            month3: el.price,
            month4: el.price,
            month5: el.price,
            month6: el.price,
          };
        }
        return { forecastedObj, supplierMaxCapacity, leadTimeObj };
      });

      window.supplierObject = convertedData.map((data) => data.forecastedObj);
      //console.log("convertedData =====>", window.supplierObject);

      return this.setState({
        supplierDetails: convertedData,
        count: this.state.count + 1,
      });
    }
  };

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-secondary"
          onClick={() => this.confirmDeleteProduct(rowData)}
          style={{ width: "30px" }}
        />
      </React.Fragment>
    );
  }

  dateMaker = (yr, mnt) => {
    const date = new Date(yr, mnt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    return date;
  };

  render() {
    // console.log("state before===>", this.state);

    let seriesData = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let year = new Date().getFullYear() * 1;
    let month = new Date().getMonth() * 1;
    let month1 = this.dateMaker(year, month);
    let month2 = this.dateMaker(year, month + 1);
    let month3 = this.dateMaker(year, month + 2);
    let month4 = this.dateMaker(year, month + 3);
    let month5 = this.dateMaker(year, month + 4);
    let month6 = this.dateMaker(year, month + 5);

    const { data, InventoryInfo, icisForecastErrorInfoUpdated, supplierDetails, count } = this.state;

    if (count < 2 && data) this.convertData();

    const forcastSeriesData =
      supplierDetails.length > 0
        ? supplierDetails.map((supplier) => {
            let objData = {
              name: supplier.forecastedObj.name,
              data: [
                [month1, supplier.forecastedObj.month1],
                [month2, supplier.forecastedObj.month2],
                [month3, supplier.forecastedObj.month3],
                [month4, supplier.forecastedObj.month4],
                [month5, supplier.forecastedObj.month5],
                [month6, supplier.forecastedObj.month6],
              ],
            };
            //console.log("forcastSeriesData ====>", objData);
            return objData;
          })
        : [];

    const forecastedSupplierPriceOpthin = {
      chart: {
        zoomType: "x",
      },
      title: {
        // text: "Sabic Historical Prices",
        text: "",
        align: "center",
      },
      yAxis: {
        // type: "datetime",
        title: {
          text: "USD/T",
        },
      },
      xAxis: {
        categories: [month1, month2, month3, month4, month5, month6],
        title: {
          text: "Date",
        },
      },
      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
      series: forcastSeriesData,
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
    if (this.state.seriesName.length > 0) {
      seriesData = this.state.seriesName.map((el, i) => {
        return { index: i + 1, series: el.name };
      });
    }

    // <Forcast />;
    const productDialogFooter = (
      <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
      </React.Fragment>
    );

    const deleteProductDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
      </React.Fragment>
    );

    const historicalPricesOpthion = {
      chart: {
        zoomType: "x",
      },
      title: {
        text: "",

        align: "center",
      },
      yAxis: {
        // type: "datetime",
        title: {
          text: "USD/T",
        },
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Year",
        },
      },
      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },
      series: this.state.HistoricalChartData,
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

    const header2 = (
      <div className="table-header-container">
        <h5
          style={{
            fontWeight: "bolder",
            fontFamily: "Poppins",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Enter Supplier Information{" "}
        </h5>
      </div>
    );

    return (
      <div>
        {/* <AppTopbar onToggleMenu={"onToggleMenu"} /> */}
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
            Supplier Analysis
          </h5>
          <div className="card ">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Poppins",
              }}
            >
              <div className="col-10" style={{ width: "80%" }}>
                <Toast ref={(el) => (this.toast = el)} />
                <DataTable
                  header={header2}
                  value={this.state.products}
                  rows={5}
                  editMode="row"
                  dataKey="id"
                  onRowEditInit={this.onRowEditInit}
                  onRowEditCancel={this.onRowEditCancel}
                >
                  <Column field="name" header="Supplier Name" editor={(props) => this.nameEditor("products", props)} />

                  <Column
                    field="quantity"
                    header="Formula/Fixed Price (USD/T)"
                    editor={(props) => this.quatityEditor("products", props)}
                  />
                  <Column
                    field="price"
                    header="Max Capacity (T)"
                    editor={(props) => this.priceEditor("products", props)}
                  />
                  <Column
                    field="Percentage"
                    header="Lead Time (Months)"
                    editor={(props) => this.leadTime("products", props)}
                  />
                  <Column rowEditor style={{ width: "13%" }}></Column>

                  <Column body={this.actionBodyTemplate} style={{ width: "10%" }}></Column>
                </DataTable>
                <div
                  style={{
                    float: "",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 30px",
                  }}
                >
                  <Button
                    label={this.state.products.length === 0 ? "Add Supplier" : "Add More Supplier"}
                    icon="pi pi-plus"
                    // className="p-mr-2"
                    onClick={this.openNew}
                  />
                </div>
              </div>

              {/* ======================right coloumn=============================== */}

              {/* ===================================================== */}
            </div>
          </div>
          <div className="card">
            <h5
              style={{
                fontWeight: "bolder",
                fontFamily: "Poppins",
                margin: "15px",
              }}
            >
              Historical Unit Prices
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px 10px",
                fontFamily: "Poppins",
              }}
            ></div>
            <div style={{ width: "100%" }}>
              <HighchartsReact highcharts={Highcharts} options={historicalPricesOpthion} />
            </div>

            <h5
              style={{
                fontWeight: "bolder",
                fontFamily: "Poppins",
                margin: "15px",
              }}
            >
              Forecasted Prices
            </h5>
            <div style={{ width: "100%" }}>
              <HighchartsReact highcharts={Highcharts} options={forecastedSupplierPriceOpthin} />
            </div>
          </div>

          {/* ======================================================= */}

          <Dialog
            visible={this.state.productDialog}
            style={{ width: "600px" }}
            header="Please Select"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={this.hideDialog}
          >
            <div className="p-field">
              <label htmlFor="Material_Number">Supplier Name</label>
              <Dropdown
                id="name"
                value={this.state.product.name}
                options={["A", "B", "C"]}
                onChange={(e) => this.onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": this.state.submitted && !this.state.product.name,
                })}
              />
              {this.state.submitted && !this.state.product.name && (
                <small className="p-error">Supplier Name is required.</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="quantity">Formula/Fixed Price (USD/T)</label>
              <InputText
                id="quantity"
                value={this.state.product.quantity}
                onChange={(e) => this.onInputChange(e, "quantity")}
                required
              />
              {this.state.submitted && !this.state.product.quantity && (
                <small className="p-error">Formula/Fixed Price is required.</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="price">Max Capacity (T)</label>
              <InputText
                id="price"
                value={this.state.product.price}
                onValueChange={(e) => this.onInputNumberChange(e, "price")}
                required
              />
              {this.state.submitted && !this.state.product.price && (
                <small className="p-error">Max Capacity is required.</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="Percentage">Lead Time (Months)</label>
              <InputText
                id="Percentage"
                value={this.state.product.Percentage}
                onValueChange={(e) => this.onInputNumberChange(e, "Percentage")}
                required
              />
              {this.state.submitted && !this.state.product.Percentage && (
                <small className="p-error">Lead Time is required.</small>
              )}
            </div>
          </Dialog>

          {/* ======================================================= */}

          <Dialog
            visible={this.state.deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={this.hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
              {this.state.product && (
                <span>
                  Are you sure you want to delete <b>{this.state.product.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/orderOptimization/CostDriversAnalysis">
              <Button className="previousbutton" label="Previous" style={{ marginRight: " 15px" }} />
            </Link>
            {/* <Link to="/orderOptimization/Inventory"> */}
            <Button className="nextbutton" label="Next" style={{ marginLeft: " 15px" }} onClick={this.optimize} />
            {/* </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

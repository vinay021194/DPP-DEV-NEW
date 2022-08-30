import axios from "axios";

export class ProductService {
  getProductsSmall() {
    return fetch("/assets/demo/data/products-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProducts() {
    return fetch("/assets/demo/data/products.json")
      .then((res) => res.json())
      .then((d) => d.data);
  } // getProductsWithOrdersSmall() { //     return fetch('assets/demo/data/material_info.json').then(res => res.json()).then(d => d.data); // }

  getProductsWithOrdersSmall() {
    return fetch("/assets/demo/data/products-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getIcisForecastSummaryTable() {
    return fetch("/assets/demo/data/icis_forecast_summary_table.json")
      .then((res) => res.json())
      .then((d) => d.Sheet1);
  }

  getsupplierTable() {
    return fetch("/assets/demo/data/supplierData.json")
      .then((res) => res.json())
      .then((d) => console.log("d===>", d));
  }

  getplantTable() {
    return fetch("/assets/demo/data/plantData.json")
      .then((res) => res.json())
      .then((d) => d.Sheet1);
  }

  getMaterialInfo() {
    return fetch("/assets/demo/data/overview.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getMaterial() {
    return fetch("/assets/demo/data/material_info.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getInventoryInfo() {
    return fetch("/assets/demo/data/inventory_info.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getIcisForecastSummaryTable2() {
    return fetch("/assets/demo/data/icis_forecast_summary_table_2.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getdemandSummaryTable2() {
    return fetch("/assets/demo/data/demand_regrwssion_summary_table_2.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getplantdata() {
    return fetch("/assets/demo/data/plant_data.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getdemandRegressionSummaryTable2() {
    return fetch("/assets/demo/data/demandRegressionSummaryTableData2.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  gettransposedData() {
    return fetch("/assets/demo/data/transposedData.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getIcisForecastSummaryTable2NEW() {
    return fetch("/assets/demo/data/icis_forecast_summary_table_2_NEW.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getPricePridectionTable() {
    return fetch("/assets/demo/data/price_pridection_table.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getPlantinventoryTable() {
    return fetch("/assets/demo/data/plantinventory.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  getPlantInfo() {
    return fetch("/assets/demo/data/demandplantinfo.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}

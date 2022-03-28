import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductService from "../services/ProductService";
import ProcService from "../services/ProcService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MultiSelect } from "primereact/multiselect";
import { Link } from "react-router-dom";
import buyerId  from "./MaterialForm";

export class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryUITable: [],
    };

    this.productService = new ProductService();
    this.procService = new ProcService();
  }

  

  componentDidMount() {
    console.log("buyerId====>",window.buyerId)
    this.procService
      .getCategoryTable({ material: this.props })
      .then((data) => {
      data.data = data.data.filter((d)=> d.pur_grp === window.buyerId)  
      let  data1 =  data.data.map((row,i) => {
       row.avg_consumption = Math.round(row.avg_consumption)
       row.conslidated_demand = Math.round(row.conslidated_demand)
       row.diff_open_safety_stock = Math.round(row.diff_open_safety_stock)
       row.onroute_quantity = Math.round(row.onroute_quantity)
       row.safety_stock = Math.round(row.safety_stock)
       row.opening_stock = Math.round(row.opening_stock)
      
      }
       
      )
      //console.log("Data in excel===>",data.data)
        return this.setState({
          
          categoryUITable:data.data
          
        });
      });
  }
 
  statusBodyTemplate(rowData) {
    console.log("statusBodyTemplate====>",rowData.material)
    window.material = rowData.material
    return (

      <Link to={{pathname:"/DemandAndInventoryAnalysis",state:{material:rowData.material}}}>

        <span style={{ color: "#009FDA" }}>View More </span>

      </Link>

    );

  }

  render() {
    // console.log("state Data  =>", this.state);

    return (
      <div>
        <div className="card">
          <h5 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Buyer Group-03J Overview Across Plants(Consolidated)</h5>

          {/* <h4 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Inventory Analysis</h4> */}
          <DataTable
            value={this.state.categoryUITable}
            paginator
            rows={5}
            rowsPerPageOptions={[10, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column  field="material" header="Material Number"/>
            <Column field="alert_category" header="Alert Category" />
            <Column field="ROP" header="ROP" />
            <Column
              field="avg_consumption"
              header="Average Anual consumption"
            />
            <Column field="conslidated_demand" header="Potential Consumption" />
            <Column field="material_type" header="Material Type" />
             <Column field="base_unit_of_measure" header="UOM" />
             <Column field="open_pr_quantity" header="PR Qty" />
             <Column field="onroute_quantity" header="On Route Qty" />
             <Column field="demand_period" header="Forcasted Period" />
             <Column header="Action" body={this.statusBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    );
  }
}

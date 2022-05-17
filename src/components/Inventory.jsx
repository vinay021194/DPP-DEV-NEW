import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/ProductService';
import { Button } from 'primereact/button';
import './App.css';
import { AppTopbar } from "./AppTopbar";
import { Link } from "react-router-dom";
import plantJsonData from "../data/plantData.json"


 export const Inventory = (props) => {
 //console.log("props===>",props.location.state.supplierDetails)
    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [plantData, setPlantData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    //const toast = useRef(null);
    const isMounted = useRef(false);
    const productService = new ProductService();
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [plantData2000,setplantData2000] = useState([]);
  const [plantData3000,setplantData3000] = useState([])

  const [supplierObject, setsupplierObject] = useState(null);

    let menuClick = false;
    const options = {
      chart: {
        type: "spline"
      },
      title: {
        text: "My chart"
      },
      series: [
        {
          data: [1,3,2,7,5,11,9]
        }
      ]
      
    };
 
    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
            //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        }
        
    }, [expandedRows]);
   
    
    

    useEffect(() => {
        isMounted.current = true;
        productService.getMaterial().then(data => setProducts(data));
        setsupplierObject(props.location.state?.supplierDetails)
    }, []); 
    
    useEffect(() => {
      isMounted.current = true;
      productService.getInventoryInfo().then(data => setProducts2(data));
  }, []);

  useEffect(() => {
    isMounted.current = true;
    productService.getPlantinventoryTable().then(data =>  setPlantData(data));
    productService.getPlantinventoryTable().then(data =>  setplantData2000(data.Sheet1.filter(data=> data.plant==="2000")));
    productService.getPlantinventoryTable().then(data =>  setplantData3000(data.Sheet1.filter(data=> data.plant==="3000")));


    // let datap = plantData.filter(data=> data.plant =  "2000")
    // console.log('datap',datap)

}, []);
  
  // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        //toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    }

    const onRowCollapse = (event) => {
       // toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    }

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => _expandedRows[`${p.id}`] = true);

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    // }

    // const amountBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.amount);
    // }
    
    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`products-badge status-${rowData.plant.toLowerCase()}`}>{rowData.status_level_inventory}</span>;
    }

   
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
    const header1 = (
        <div className="table-header-container">
           <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Material</h5>
        </div>
    );
    const header2 = (
      <div className="table-header-container">
         <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Inventory</h5>
      </div>
  );
  const header3 = (
    <div className="table-header-container">
       <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Plant-2000</h5>
       <h10 style={{ fontWeight:'lighter', fontFamily: "Poppins" }}>All values are in Tonnes</h10>
    </div>
    
);

const header4 = (
  <div className="table-header-container">
     <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Plant-3000</h5>
     <h10 style={{ fontWeight:'lighter', fontFamily: "Poppins" }}>All values are in Tonnes</h10>
  </div>
);
const header5 = (
  <div className="table-header-container">
     <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Forecasted Prices</h5>
     <h10 style={{ fontWeight:'lighter', fontFamily: "Poppins" }}>All values are in US$</h10>
  </div>
);

    return ( 
    
    <div >
             <AppTopbar onToggleMenu={onToggleMenu} />
            {/* <Toast ref={toast} /> */}
          <div className='layout-main'>
             <div className="card">
                <DataTable 
                value={products.Sheet3}
               
                    responsiveLayout="scroll"
                   // rowExpansionTemplate={rowExpansionTemplate}
                     dataKey="id" header={header1}   
                        rows={1}>
                   
                   <Column field="material" header="ID" ></Column>
                    {/* <Column field="Discription" header="Discription"  ></Column> */}
                    <Column field="base_unit_of_measure (UOM)" header="UOM"  ></Column>
                    <Column field="aliases" header="Aliases" />
                    {/* <Column field="Criticality" header="Criticality"   /> */}
                    <Column field="material_type (SAP)" header="SAP"   />
                    <Column field="material_group (organisation)" header="Organization"  />
                    <Column field="mdrm_class (class)" header="Class"  />
                </DataTable>
            </div>
            <div className='card'>
           <DataTable 
                   value={products2.Sheet3} 
                    dataKey="id"
                    header={header2}
                    rows={4}
                    >
                    <Column field="plant" header="Plant ID" ></Column>
                    <Column field="plant_name" header="Plant Name" ></Column>
                    <Column field="safety_stock" header="Safety Stock" ></Column>
                    <Column field="opening_stock" header="Inventory"  />
                    <Column field="warehouse_capacity" header="Warehouse capacity"  />
                    <Column field="status_level_inventory" header="Status" body={statusOrderBodyTemplate} />
                    
                   
                </DataTable>
                </div>
                <div className='card'>
               
           <DataTable 
                   value={plantData2000} 
                    dataKey="key"
                    header={header3}
                    rows={2}
                    >
                    <Column field="data" header="" ></Column>
                    <Column field="month_1" header="May22" ></Column>
                    <Column field="month_2" header="Jun22"  />
                    <Column field="month_3" header="Jul22"   />
                    <Column field="month_4" header="Aug22"  />
                    <Column field="month_5" header="Sep22" />
                    <Column field="month_6" header="Oct22"  />
                   
                    
                </DataTable>
                </div>
                <div className='card'>
               <DataTable 
                       value={plantData3000} 
                        dataKey="key"
                        header={header4}
                        rows={2}
                        >
                        <Column field="data" header="" ></Column>
                        <Column field="month_1" header="May22" ></Column>
                        <Column field="month_2" header="Jun22"  />
                        <Column field="month_3" header="Jul22"   />
                        <Column field="month_4" header="Aug22"  />
                        <Column field="month_5" header="Sep22" />
                        <Column field="month_6" header="Oct22"  />
                    </DataTable>
                    </div>
                <div className='card'>
              <DataTable 
                   value={supplierObject} 
                    dataKey="id"
                    header={header5}
                    rows={3}
                    >
                    <Column field="name" header="Supplier" ></Column>
                    <Column field="month1" header="May22" ></Column>
                    <Column field="month2" header="Jun22"   />
                    <Column field="month3" header="Jul22"   />
                    <Column field="month4" header="Aug22"   />
                    <Column field="month5" header="Sep22"  />
                    <Column field="month6" header="Oct22"  />
                    
                </DataTable>
                </div>
                
                <div style={{ display:'flex',justifyContent:'center'}}>
          <Link to='/SupplierAnalysis'>
            <Button
              className='previousbutton'
              label="Previous"
              style={{   }}
            />
            </Link>
            <Button
              className='nextbutton'
              label="Edit"
              style={{marginLeft: " 15px" }}
              icon= "pi pi-lock"
            />
             <Link to='/Orderingplant'>
            <Button
            className='nextbutton'
              label="Generate ordering schedule"
            style={{ marginLeft: " 15px"  }}
           
            />
            </Link>
           
           
            
            </div>
            </div>
            
              
        </div>
       
       
    );
}
                 
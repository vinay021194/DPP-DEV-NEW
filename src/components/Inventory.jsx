import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/ProductService';
import { Button } from 'primereact/button';
import './App.css';
import { AppTopbar } from "./AppTopbar";

 export const Inventory = (props) => {
 //console.log("props===>",props.location.state.supplierDetails)
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
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
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
    productService.getplantdata().then(data => setProducts3(data));
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
        return <span className={`product-badge status-${rowData.safety_stock.toLowerCase()}`}>{rowData.status_level_inventory}</span>;
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
           <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Material Overview</h5>
        </div>
    );
    const header2 = (
      <div className="table-header-container">
         <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Inventory</h5>
      </div>
  );
  const header3 = (
    <div className="table-header-container">
       <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Plant2000</h5>
    </div>
);
const header4 = (
  <div className="table-header-container">
     <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Plant3000</h5>
  </div>
);
const header5 = (
  <div className="table-header-container">
     <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Supplier</h5>
  </div>
);
const header6 = (
  <div className="table-header-container">
     <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Supplier02</h5>
  </div>
);
//   const header3 = (
//     <div className="table-header-container">
//        <h5 style={{ fontWeight: "bolder", fontFamily: "Sans-serif" }}>Plant3000</h5>
//     </div>
// );
    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div className="orders-subtable">
    //             {/* <h5>Orders for {data.name}</h5> */}
    //             <DataTable value={data.orders} responsiveLayout="scroll"  rows={1} >
    //                 <Column field="id" header="Plant Id(Name)" ></Column>
    //                 <Column field="name" header="Safety Stock"   body={statusOrderBodyTemplate}></Column>
    //                 <Column field="inventory" header="Inventory"   body={statusOrderBodyTemplate}></Column>
    //                 <Column field="status" header="WareHouse Capacity" body={statusOrderBodyTemplate} ></Column>
    //                 <Column field="status" header="Status"  body={ratingBodyTemplate} ></Column>
    //                 {/* <Column field="" header="" body={statusOrderBodyTemplate} ></Column> */}
                    
    //             </DataTable>
    //         </div>
    //     );
    // }
    

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
                   
                   <Column field="material" header="ID" sortable></Column>
                    {/* <Column field="Discription" header="Discription" sortable ></Column> */}
                    <Column field="base_unit_of_measure (UOM)" header="UOM" sortable ></Column>
                    <Column field="aliases" header="Aliases" sortable/>
                    {/* <Column field="Criticality" header="Criticality" sortable  /> */}
                    <Column field="material_type (SAP)" header="SAP" sortable  />
                    <Column field="material_group (organisation)" header="Organisation" sortable />
                    <Column field="mdrm_class (class)" header="Class"  />
                </DataTable>
            </div>
            <div className='card'>
           <DataTable 
                   value={products2.Sheet3} 
                  //  expandedRows={expandedRows}
                    // onRowToggle={(e) => setExpandedRows(e.data)}
                    // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    // rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    header={header2}
                    rows={4}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="plant" header="PlantID(Name)" ></Column>
                    <Column field="safety_stock" header="Safety Stock" ></Column>
                    <Column field="opening_stock" header="Inventory"  />
                    <Column field="warehouse_capacity" header="Warehouse capacity"  />
                    <Column field="status_level_inventory" header="Status" body={statusOrderBodyTemplate} />
                    
                   
                </DataTable>
                </div>
                <div className='card'>
               
           <DataTable 
                   value={products3.Sheet1} 
                  //  expandedRows={expandedRows}
                  //   onRowToggle={(e) => setExpandedRows(e.data)}
                  //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                  //   rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="key"
                    header={header3}
                    rows={2}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="undefined" header="" ></Column>
                    <Column field="June" header="Jan21" ></Column>
                    <Column field="July" header="Feb21"  />
                    <Column field="August" header="Mar21"   />
                    <Column field="September" header="Apr21"  />
                    <Column field="October" header="May21" />
                    <Column field="November" header="Jun21"  />
                   
                    
                </DataTable>
                </div>
                <div className='card'>
               
               
           <DataTable 
                   value={supplierObject} 
                  //  expandedRows={expandedRows}
                  //   onRowToggle={(e) => setExpandedRows(e.data)}
                  //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                  //   rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    header={header5}
                    rows={3}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="name" header="Supplier" ></Column>
                    <Column field="month1" header="Jan21" ></Column>
                    <Column field="month2" header="Feb21"   />
                    <Column field="month3" header="Mar21"   />
                    <Column field="month4" header="Apr21"   />
                    <Column field="month5" header="May21"  />
                    <Column field="month6" header="Jun21"  />
                    
                </DataTable>
                </div>
                
                <div style={{ display:'flex',justifyContent:'center' }}>
                <a href='SupplierAnalysis'>
            <Button
              className='previousbutton'
              label="Previous"
              style={{ marginRight: '15px'  }}
            />
            </a>
                <a href='Orderingplant'>
            <Button
            className='nextbutton'
              label="Generate ordering schedule"
              style={{ marginLeft: " 15px"  }}
            />
            </a>
            </div>
            </div>
            
              
        </div>
       
       
    );
}
                 
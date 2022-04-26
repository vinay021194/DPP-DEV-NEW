import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/ProductService';
import { Button } from 'primereact/button';
import './App.css';
import { AppTopbar } from "./AppTopbar";
import plantJsonData from "../data/plantData.json"
import supplierJsonData from "../data/supplierData.json"


 export const Orderingplant = () => {
    const [products, setProducts] = useState([]);
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
  const [supplierData, setsupplierData] = useState(null);
  const [plantData, setplantData] = useState(null);

 console.log("plantJsonData===>",plantJsonData)
 console.log("supplierJsonData===>",supplierJsonData)

    let menuClick = false;
    
    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
            //toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        }
    }, [expandedRows]);
    useEffect(() => {
      isMounted.current = true;
      productService.getMaterial().then((data) => setProducts3(data));
    }, []);

    useEffect(() => {
        isMounted.current = true;
        productService.getMaterialInfo().then(data => setProducts(data));
        setsupplierData(supplierJsonData.Sheet1)
        setplantData(plantJsonData.data.Sheet1)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => _expandedRows[`${p.id}`] = true);

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
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
   


    const header = (
        <div className="table-header-container">
           <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Buyer Group - 07J, Material - 949555 information</h5>
        </div>
    );
    const header2 = (
      <div className="table-header-container">
         <h5 style={{ fontWeight: "bolder", fontFamily: "Poppins" }}>Ordering Schedule Plant(Tons)</h5>
      </div>
  );

    return ( 
        <div >
             <AppTopbar onToggleMenu={onToggleMenu} />
            {/* <Toast ref={toast} /> */}
          <div className='layout-main'>
          <div className="card">
                <DataTable 
                value={products3.Sheet3}
                //  expandedRows={expandedRows} 
                // onRowToggle={(e) => setExpandedRows(e.data)}
                //     onRowExpand={onRowExpand} 
                //     onRowCollapse={onRowCollapse} 
                    responsiveLayout="scroll"
                   // rowExpansionTemplate={rowExpansionTemplate}
                     dataKey="id" header={header}   
                        rows={1}>
                   
                   <Column field="material" header="ID" sortable></Column>
                   <Column field="material_type (SAP)" header="Type" sortable  />
                    <Column field="material_description_1" header="Discription" sortable ></Column>
                    <Column field="base_unit_of_measure (UOM)" header="UOM" sortable ></Column>
                    <Column field="mdrm_class (class)" header="UNSPSC Discription" sortable />
                   
                </DataTable>
            </div>
            <div className='card'>
           <DataTable 
                   value={supplierData} 
                  //  expandedRows={expandedRows}
                    // onRowToggle={(e) => setExpandedRows(e.data)}
                    // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                    // rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    header={header2}
                    rows={1}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="Plant" header="Plant"  ></Column>
                    <Column field="Supplier" header="Supplier Name"  ></Column>
                    <Column field="June" header="Feb22"  />
                    <Column field="July" header="Mar22"  />
                    <Column field="August" header="Apr22" />
                    <Column field="September" header="May22"  />
                    <Column field="October" header="Jun22"   />
                    <Column field="November" header="July22"  />
                    <Column field="Total Quantity" header="Total Quantities From Supplier"   />
                   
                </DataTable>
                </div>
                <div className='card'>
               
           <DataTable 
                   value={plantData} 
                   
                  //  expandedRows={expandedRows}
                  //   onRowToggle={(e) => setExpandedRows(e.data)}
                  //   onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                  //   rowExpansionTemplate={rowExpansionTemplate} 
                    dataKey="id"
                    //header={header3}
                    rows={5}
                    >
                    {/* <Column expander style={{ width: '3em' }} /> */}
                   
                    <Column field="Plant" header="Plant"  ></Column>
                    <Column field="undefined" header="Name"  ></Column>
                    <Column field="June" header="Feb22"  />
                    <Column field="July" header="Mar22"  />
                    <Column field="August" header="Apr22" />
                    <Column field="September" header="May22"  />
                    <Column field="October" header="Jun22"   />
                    <Column field="November" header="July22"  />
                    
                </DataTable>
                </div>
                <div style={{ display:'flex', justifyContent:'center' }}>
           <a href='Inventory'>
            <Button
            className='previousbutton'
              label="Previous "
              style={{ marginRight: " 15px"  }}
            />
            </a>
            <a href=' '>
            <Button
              className='nextbutton'
              label="Download Ordering schedule "
              style={{ marginLeft: " 15px"  }}
            />
             </a>
            </div>
            </div>
               
         
        </div>
       
       
    );
}
                 
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { ProductService } from "../services/ProductService";


export const AppMenu = (props) => {
  const [cities, setCities] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectPlant, setSelectPlant] = useState(null);
  const [filteredMaterial, setFilteredMaterial] = useState(null);
  const [filteredPlant, setfilteredPlant] = useState(null);
  const[materials,setMaterials]= useState(null)
  const[plants,setPlants]= useState(null)
  const [uniqPlant, setUniqPlant] = useState([]);
  const productService = new ProductService();

  useEffect(()=>{
    productService.getMaterialInfo().then((data) => {
      const uniq = (items) => [...new Set(items)];
      const uniqMaterial = uniq(data.map((item) => item.material.toString()));
      console.log("uniqMaterial",uniqMaterial)
      // const key = 'age';

//  const uniqMaterial = [...new Map(data.map(item =>
//   [item[key], item])).values()];
      return setMaterials(uniqMaterial);
      
    });
    productService.getMaterialInfo().then((data) => {
      const uniq = (items) => [...new Set(items)];
      const uniqPlants = uniq(data.map((item) => item.plant.toString()));
      console.log("uniqPlants",uniqPlants)
      return setPlants(uniqPlants);
      
    });
    
  },[])

  const onCityChange = (e) => {
    let selectedCities = [...cities];
    if (e.target?.innerText === "CLEAR ALL") {
      selectedCities = [];
    } else if (e.target.value === "All" && e.checked)
      selectedCities = ["All", "Urgent", "Depleting fast", "Sufficient"];
    else if (e.target.value === "All" && e.checked !== true)
      selectedCities = [];
    else if (e.checked) selectedCities.push(e.value);
    else selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setCities(selectedCities);
    props.handlefilter(selectedCities, "checkbox");
  };

  const onMaterialChange = (e) => {
    setSelectedMaterial(e.value);
    props.handlefilter(e.value, "Multiselect");
  };

  const onPlantChange = (e) => {
    setSelectPlant(e.value);
    props.handlefilter(e.value,"singleselect");
    console.log('handlePlantfilter',props)
  };

  const searchMaterial = (event) => {
    setTimeout(() => {
      let _filteredMaterial;
      if (!event.query.trim().length) {
        _filteredMaterial = [...materials];
      } else {
        _filteredMaterial = materials.filter((item) =>{
         return item.material})};
      setFilteredMaterial(_filteredMaterial);
    }, );
      
  };

  const searchPlant = (event) => {
    setTimeout(() => {
      let _filteredPlant;
      if (!event.query.trim().length) {
        _filteredPlant = [...plants];
      } else {
        _filteredPlant = plants.filter((item) => item.includes(event.query));
      }

      setfilteredPlant(_filteredPlant);
    }, );
  };

  return (
    <div className="layout-menu-container">
      <div
        style={{
          paddingTop: "15px",
          marginLeft: "50px",
          fontSize: "15px",
          fontFamily: "Poppins",
        }}
      >
        <h5>Filter By</h5>
      </div>
      <hr />
      <div style={{ marginLeft: "25px", fontFamily: "Poppins" }}>
        <strong>Material Status</strong>
      </div>
      <div className="gridcheck">
        <Checkbox
          inputId="cb4"
          value="All"
          onChange={onCityChange}
          checked={cities.includes(
            "All",
            "Urgent",
            "Depleting fast",
            "Sufficient"
          )}
          style={{ marginRight: "15px" }}
        ></Checkbox>

        <label htmlFor="cb4" className="p-checkbox-label">
          All
        </label>
      </div>
      <div className="gridcheck">
        <Checkbox
          inputId="cb1"
          value="Urgent"
          onChange={onCityChange}
          checked={cities.includes("Urgent")}
          style={{ marginRight: "15px" }}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          Urgent
        </label>
      </div>
      <div className="gridcheck">
        <Checkbox
          inputId="cb2"
          value="Depleting fast"
          onChange={onCityChange}
          checked={cities.includes("Depleting fast")}
          style={{ marginRight: "15px" }}
        ></Checkbox>
        <label htmlFor="cb2" className="p-checkbox-label">
          Depleting fast
        </label>
      </div>
      <div className="gridcheck">
        <Checkbox
          inputId="cb3"
          value="Sufficient"
          onChange={onCityChange}
          checked={cities.includes("Sufficient")}
          style={{ marginRight: "15px" }}
        ></Checkbox>
        <label htmlFor="cb3" className="p-checkbox-label">
          Sufficient
        </label>
      </div>
      <div className="gridcheck">
        <Button
          className="nextbutton1"
          label="Clear All "
          value="clear"
          onClick={onCityChange}
        />
      </div>
      <hr />
      <div style={{ marginLeft: "25px", fontFamily: "Poppins" }}>
        <strong>Material ID</strong>
      </div>
      <div className="gridcol">
        <AutoComplete
          value={selectedMaterial}
          suggestions={filteredMaterial}
          completeMethod={searchMaterial}
          dropdown
         // field="material"
          multiple
          onChange={onMaterialChange}
          aria-label="materials"
          sorted
        />
      </div>
      <div className="gridcol">
        <AutoComplete
          value={selectPlant}
          suggestions={filteredPlant}
          completeMethod={searchPlant}
          dropdown
          // field="plant"
          onChange={onPlantChange}
          aria-label="plants"
          sorted
        />
      </div>
    </div>
  );
};

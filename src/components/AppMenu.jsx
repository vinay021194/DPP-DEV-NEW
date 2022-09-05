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
  const [materials, setMaterials] = useState(null);
  const [plants, setPlants] = useState(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getMaterialInfo().then((data) => {
      const uniq = (items) => [...new Set(items)];
      const uniqMaterial = uniq(data.map((item) => item.material.toString()));
      return setMaterials(uniqMaterial);
    });
    productService.getMaterialInfo().then((data) => {
      const uniq = (items) => [...new Set(items)];
      let uniqPlants = data.map((item) => item.expend);
      uniqPlants = [].concat(...uniqPlants);
      uniqPlants = uniq(uniqPlants.map((item) => item.plant.toString()));
      uniqPlants.sort();
      return setPlants(uniqPlants);
    });
  }, []);

  const onCityChange = (e) => {
    let selectedCities = [...cities];
    if (e.target?.innerText === "CLEAR ALL") {
      selectedCities = [];
    } else if (e.target.value === "All" && e.checked)
      selectedCities = ["All", "Urgent", "Depleting fast", "Sufficient"];
    else if (e.target.value === "All" && e.checked !== true) selectedCities = [];
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
    props.handlefilter(e.value, "singleselect");
  };

  const searchMaterial = (event) => {
    setTimeout(() => {
      let _filteredMaterial;
      if (!event.query.trim().length) {
        _filteredMaterial = [...materials];
      } else {
        _filteredMaterial = materials.filter((item) => {
          return item.material;
        });
      }
      setFilteredMaterial(_filteredMaterial);
    });
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
    });
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "10px" }}>
          <div style={{ fontFamily: "Poppins" }}>
            <strong>Material Status</strong>
          </div>
          <div className="gridcheck">
            <Checkbox
              inputId="cb4"
              value="All"
              onChange={onCityChange}
              checked={cities.includes("All", "Urgent", "Depleting fast", "Sufficient")}
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
          <div className="gridcheck p-mt-3">
            <Button className="previousbutton" label="Clear All " value="clear" onClick={onCityChange} />
          </div>
        </div>
        <hr />
        <div style={{ margin: "10px" }}>
          <div>
            <strong>Material ID</strong>
          </div>
          <div className="">
            <AutoComplete
              value={selectedMaterial}
              suggestions={filteredMaterial}
              completeMethod={searchMaterial}
              dropdown
              multiple
              onChange={onMaterialChange}
              aria-label="materials"
              sorted
            />
          </div>
        </div>
        <hr />
        <div style={{ margin: "10px" }}>
          <div>
            <strong>Plant ID</strong>
          </div>
          <div className="">
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
      </div>
    </div>
  );
};

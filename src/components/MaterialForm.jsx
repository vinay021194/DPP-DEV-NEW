import React, { useState } from "react";
import { useFormik } from "formik";
// import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { Password } from "primereact/password";
// import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
// import { classNames } from "primereact/utils";
import { CountryService } from "../services/CountryService";
import "./FormDemo.css";
import { Link } from "react-router-dom";
import { CategoryView  } from "./Categoryview";

window.buyerId="";

export const MaterialForm = () => {
  const [countries, setCountries] = useState([
    { name: "07J", code: "07J" },
    { name: "ALL", code: "ALL" },
    { name: "7P2", code: "7P2" },
  ]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  //const [buyerId, setbuyerId] = useState({});


  
  const formik = useFormik({
    initialValues: {
      country: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.country) {
        errors.country = "Material is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
      setCountries();

      formik.resetForm();
    },
  });
   
  const handleChange = (e) => {
    window.buyerId = e.value.name;
  }



  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
 

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5 style={{ fontWeight:"bolder", fontFamily:'revert' }}>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="p-d-flex p-jc-center">
        <div className="card">
          <h5 className="p-text-center" style={{ fontWeight:"bolder", fontFamily:'revert' }}>Please Enter Buyer Purchasing Group</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label">
                <Dropdown
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={handleChange}

                  options={countries}
                  optionLabel="name"
                />
                <label htmlFor="country">Buyer Group</label>
                {/* {this.state.submitted && !this.state.countries.name && (
                  <small className="p-error">
                    Material Number is required.
                  </small>
                )} */}
              </span>
            </div>
            <Link to="/CategoryView">
              <Button type="submit" label="Submit" className="p-mt-2" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

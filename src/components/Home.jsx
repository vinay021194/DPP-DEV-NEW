import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const s1 = {
    width: "100%",
    height: window.innerHeight,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50%",
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgb(242 245 249)",
    backgroundImage: 'url("/AI2.gif")',
  };

  let menuItems = [
    {
      label: "Order Optimization",
      to: "/orderOptimization/MaterialOverview",
    },
    {
      label: "Demand Prediction",
      to: "/demandPrediction",
    },
    {
      label: "Cost Drivers Analysis",
      to: "/CostDriversAnalysis",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <div style={s1}></div>
      <div
        style={{
          width: "30%",
          backgroundImage: "linear-gradient(to right, rgb(244 247 251), rgb(241 244 248))",
          height: window.innerHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {menuItems.map((menu) => (
          <Link to={menu.to} key={menu.to}>
            <Button className="previousbutton p-my-3 homeButtons" label={menu.label} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

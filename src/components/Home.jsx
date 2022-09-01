import { Button } from "primereact/button";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { lendingPageMenuItems } from "./../appConstant";

function Home(props) {
  const { login } = props;
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
  const isLogin = localStorage.getItem("isLogin");

  // delete localStorage.demandPredictionMaterial;
  // delete localStorage.demandPredictionPlants;

  if (!login || !isLogin) {
    return <Redirect to="/login" />;
  }

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
        {lendingPageMenuItems.map((menu) => (
          <Link to={menu.to} key={menu.to}>
            <Button className="previousbutton p-my-3 homeButtons" label={menu.label} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
